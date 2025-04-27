const pool=require('../../config/db')


module.exports=(io,socket)=>{
    socket.on('send-message',async(data)=>{
        let client
        try {
            if(!data.message||data.message.length>10000){
                socket.emit('message-is-too-long')
                return
            }
            client=await pool.connect()
            const newMessage=await client.query(`INSERT INTO chat_room_messages
                 (chat_room_id,user_id,message) VALUES ($1,$2,$3) RETURNING *`,[data.chat_id,socket.userId,data.message])
            const message=newMessage.rows[0]
            const roomSockets=await io.in(`chat-${data.chat_id}`).fetchSockets();
            for (const roomSocket of roomSockets){
                const userId=roomSocket.userId
                roomSocket.emit('got-new-message',{...message,myMessage:userId===message.user_id})
            }
        } catch (e) {
            console.log(e);
        }finally{
            if (client) {
                client.release()
            }
        }
    })
}