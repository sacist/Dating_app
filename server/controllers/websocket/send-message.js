const pool=require('../../config/db')


module.exports=(io,socket)=>{
    socket.on('create-new-chat',async(data)=>{
        let client
        try {
            client=await pool.connect()
            const newChatId=(await client.query('INSERT INTO chat_room DEFAULT VALUES RETURNING id')).rows[0].id

            await client.query(`INSERT INTO chat_members (chat_room_id, user_id) VALUES ($1,$2),($1,$3)`,[newChatId,data.sender_id,data.receiver_id])

        } catch (e) {
            console.log(e);       
        }finally{
            if (client) {
                client.release()
            }
        }  
    })
    socket.on('send-message',async(data)=>{
        let client
        try {
            client=await pool.connect()
            const newMessage=await client.query(`INSERT INTO chat_room_messages
                 (chat_room_id,user_id,message) VALUES ($1,$2,$3) RETURNING *`,[data.chat_id,data.sender_id,data.message])
            const message=newMessage.rows[0]
            io.to(data.chat_id).emit('sent-message',message)

        } catch (e) {
            console.log(e);
        }finally{
            if (client) {
                client.release()
            }
        }
    })
}