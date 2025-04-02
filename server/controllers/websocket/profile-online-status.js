const pool=require('../../config/db')

module.exports=(io,socket)=>{
    socket.on('join-profile',async(nickname)=>{
        let client
        try {
            client=await pool.connect()
            const nicknameQuery=await client.query('SELECT nickname FROM users WHERE nickname ILIKE $1',[nickname])
            const nicknameWithoutCasing=nicknameQuery.rows[0].nickname
            socket.join(`profile-${nicknameWithoutCasing}`)
            console.log(`user ${socket.id} joined room: profile-${nicknameWithoutCasing}`);
        } catch (e) {
            console.log(e);         
        }finally{   
            if(client){
                client.release()
            }
        }
        
    })
    socket.on('become-online',async(nickname)=>{
        let client
        try {
            client=await pool.connect()
            await client.query('UPDATE users SET online = true WHERE id = $1',[socket.userId])
        } catch (e) {
            console.log(e);         
        }finally{   
            if(client){
                client.release()
            }
        }
        io.to(`profile-${nickname}`).emit('profile-host-online')
    })
    socket.on('leave-profile', async(nickname) => {
        let client
        try {
            client=await pool.connect()
            const nicknameQuery=await client.query('SELECT nickname FROM users WHERE nickname ILIKE $1',[nickname])
                const nicknameWithoutCasing=nicknameQuery?.rows[0]?.nickname
                if(!nicknameWithoutCasing){
                    const roomName = `profile-${nickname}`;
                    socket.leave(roomName)
                    console.log(`User ${socket.id} left room: ${roomName}`);
                }else{
                    const roomName = `profile-${nicknameWithoutCasing}`;
                    socket.leave(roomName);
                    console.log(`User ${socket.id} left room: ${roomName}`);
                }
        } catch (e) {
            console.log(e);         
        }finally{   
            if(client){
                client.release()
            }
        }
      });
}