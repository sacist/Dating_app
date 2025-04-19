const pool=require('../../config/db')

module.exports=(io,socket)=>{
    socket.on('like',async(roomId)=>{
        let client
        const room=io.sockets.adapter.rooms.get(roomId)
        if(!room) return 
        const socketIds=[...room]

        const opponentSocketId=socketIds.filter((id)=>id!==socket.id)[0]
        if(!opponentSocketId)return
        
        const opponentSocket=io.sockets.sockets.get(opponentSocketId)
        if(!opponentSocket)return
        opponentSocket.emit('got-like')

        if(socket.gotLike){
            io.to(roomId).emit('match-success')
            try {
                client=await pool.connect()
                
                const existingChat = await client.query(
                    `
                    SELECT chat_room_id 
                    FROM chat_members 
                    WHERE user_id IN ($1, $2)
                    GROUP BY chat_room_id 
                    HAVING COUNT(*) = 2
                    `,
                    [socket.userId, opponentSocket.userId]
                );
                if(existingChat.rows.length===0){
                    const chatRoom=(await pool.query(`INSERT INTO chat_room DEFAULT VALUES RETURNING id`)).rows[0]
                    await pool.query(`INSERT INTO chat_members (chat_room_id,user_id) VALUES ($1,$2)`,[chatRoom.id,socket.userId])
                    await pool.query(`INSERT INTO chat_members (chat_room_id,user_id) VALUES ($1,$2)`,[chatRoom.id,opponentSocket.userId])
                    io.to(roomId).emit('chat-created')
                }else{
                    const chatRoomId = existingChat.rows[0].chat_room_id
                    io.to(roomId).emit('chat-already-exists',chatRoomId)
                }
            } catch (e) {
                console.log(e);
            }finally{
                if(client){
                    client.release()
                }
            }
            delete opponentSocket.gotLike
            delete socket.gotLike
        }else{
            opponentSocket.gotLike=true
        }
        
    })
    socket.on('dislike',(roomId)=>{
        const room=io.sockets.adapter.rooms.get(roomId)
        if(!room) return 
        const socketIds=[...room]
        const opponentSocketId=socketIds.filter((id)=>id!==socket.id)[0]
        if(!opponentSocketId)return
        const opponentSocket=io.sockets.sockets.get(opponentSocketId)
        if(!opponentSocket)return
        opponentSocket.emit('got-dislike')

        io.to(roomId).emit('matchmaking-dismissed')

    })
}