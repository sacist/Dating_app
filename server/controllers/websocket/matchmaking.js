const pool = require('../../config/db');

module.exports = (io, socket) => {
    socket.on('join-matchmaking', async () => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query('SELECT gender FROM users WHERE id=$1', [socket.userId]);

            if (result.rows.length === 0) {
                console.log(`[join-matchmaking] User ${socket.userId} not found in DB`);
                return;
            }

            const userGender = result.rows[0].gender;
            const maleRoom = 'male-matchmaking';
            const femaleRoom = 'female-matchmaking';

            if (userGender === 'М') {
                socket.join(maleRoom);
                console.log(`[join-matchmaking] User ${socket.userId} joined ${maleRoom}`);
                matchUsers(io, socket, femaleRoom,client);
            } else {
                socket.join(femaleRoom);
                console.log(`[join-matchmaking] User ${socket.userId} joined ${femaleRoom}`);
                matchUsers(io, socket, maleRoom,client);
            }

            socket.gender = userGender;
        } catch (e) {
            console.error(`[join-matchmaking] Error: ${e.message}`);
        } finally {
            if (client) {
                client.release();
            }
        }
    });

    socket.on('leave-matchmaking', () => {
        if (socket.gender === 'М') {
            socket.leave('male-matchmaking');
            console.log(`[leave-matchmaking] User ${socket.userId} left male-matchmaking`);
        } else if (socket.gender === 'Ж') {
            socket.leave('female-matchmaking');
            console.log(`[leave-matchmaking] User ${socket.userId} left female-matchmaking`);
        }
    });
};

const matchUsers = async(io, socket, oppositeRoom,client) => {
    try {
        socket.emit('entered-matchmaking')
        console.log(`[matchUsers] Checking for opponents in ${oppositeRoom}`);
    
        const oppositeUsers = io.sockets.adapter.rooms.get(oppositeRoom);
    
        if (oppositeUsers?.size > 0) {
            const opponentSocketId = [...oppositeUsers][0];
            const opponentSocket = io.sockets.sockets.get(opponentSocketId);
    
            if (opponentSocket) {
                console.log(`[matchUsers] Match found: ${socket.userId} vs ${opponentSocket.userId}`);
    
                const roomId = `match-${socket.id}-${opponentSocket.id}`;
    
                socket.leave(oppositeRoom);
                opponentSocket.leave(oppositeRoom);
    
                socket.join(roomId);
                opponentSocket.join(roomId);
    
                console.log(`[matchUsers] Users ${socket.userId} and ${opponentSocket.userId} moved to ${roomId}`);
                
                const matchProfileQuery=await client.query(`SELECT * FROM users WHERE id =$1`,[opponentSocket.userId])
                const matchProfile=matchProfileQuery.rows[0]

                const myMatchProfileQuery=await client.query(`SELECT * FROM users WHERE id =$1`,[socket.userId])
                const myMatchProfile=myMatchProfileQuery.rows[0]

                socket.emit('match-found', { roomId, match: matchProfile });
                opponentSocket.emit('match-found', { roomId, match: myMatchProfile });
            }
        } else {
            console.log(`[matchUsers] No users found in ${oppositeRoom}`);
        }    
    } catch (e) {
        console.log(e);
          
    }
};
