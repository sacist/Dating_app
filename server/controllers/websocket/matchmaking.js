const pool = require('../../config/db');

module.exports = (io, socket) => {
    socket.on('join-matchmaking', async () => {
        let client
        try {
            client = await pool.connect()
            const result = await client.query('SELECT gender FROM users WHERE id=$1', [socket.userId])

            if (result.rows.length === 0) {
                return;
            }

            const userGender = result.rows[0].gender
            const maleRoom = 'male-matchmaking'
            const femaleRoom = 'female-matchmaking'

            if (userGender === 'М') {
                socket.join(maleRoom)
                matchUsers(io, socket, femaleRoom,client,maleRoom)
            } else {
                socket.join(femaleRoom)
                matchUsers(io, socket, maleRoom,client,femaleRoom)
            }

            socket.gender = userGender
        } catch (e) {
            socket.leave('male-matchmaking')
            socket.leave('female-matchmaking')
        
            socket.emit('matching-error')
        } finally {
            if (client) {
                client.release()
            }
        }
    });

    socket.on('leave-matchmaking', () => {
        if (socket.gender === 'М') {
            socket.leave('male-matchmaking')
        } else if (socket.gender === 'Ж') {
            socket.leave('female-matchmaking')
        }
    })
}

const matchUsers = async (io, socket, oppositeRoom, client, currentRoom) => {
    try {
        socket.emit('entered-matchmaking')

        const oppositeUsers = io.sockets.adapter.rooms.get(oppositeRoom)

        if (oppositeUsers?.size > 0) {
            const opponentSocketId = [...oppositeUsers][0]
            const opponentSocket = io.sockets.sockets.get(opponentSocketId)

            if (!opponentSocket) {
                return
            }

            const roomId = `match-${socket.id}-${opponentSocket.id}`

            socket.leave(currentRoom)
            socket.leave(oppositeRoom)

            opponentSocket.leave(currentRoom)
            opponentSocket.leave(oppositeRoom)

            socket.join(roomId)
            opponentSocket.join(roomId)

            const [matchProfileResult, matchPhotoResult] = await Promise.all([
                client.query(`SELECT description,dob,gender,name,nickname,status FROM users WHERE id = $1`, [opponentSocket.userId]),
                client.query(`SELECT photo_link FROM photos WHERE user_id = $1`, [opponentSocket.userId])
            ])

            const [myProfileResult, myPhotoResult] = await Promise.all([
                client.query(`SELECT description,dob,gender,name,nickname,status FROM users WHERE id = $1`, [socket.userId]),
                client.query(`SELECT photo_link FROM photos WHERE user_id = $1`, [socket.userId])
            ])

            const matchProfile = matchProfileResult.rows[0]
            const matchPhoto = matchPhotoResult.rows[0].photo_link
            const myProfile = myProfileResult.rows[0]
            const myPhoto = myPhotoResult.rows[0].photo_link

            socket.emit('match-found', {
                roomId,
                match: matchProfile,
                photo: matchPhoto
            });

            opponentSocket.emit('match-found', {
                roomId,
                match: myProfile,
                photo: myPhoto
            });
        }
    } catch (e) {
        socket.leave(currentRoom)
        socket.leave(oppositeRoom)

        socket.emit('matching-error')
        console.log(`[matchUsers] Error: ${e.message}`)
    }
};
