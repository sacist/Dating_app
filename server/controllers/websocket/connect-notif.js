const pool=require('../../config/db')


module.exports=(io,socket)=>{
    socket.on('sendNotif',(data)=>{
        console.log(`Сообщение от ${socket.id}:${data.message}`);
               
        io.emit('receiveNotif',{
            message:`Новое уведомление:${data.message}`,
            timestamp:new Date().toISOString()
        })
    })
    socket.on('fetchUsers',async()=>{
        let client
        try {
            client=await pool.connect()    
            const users=await client.query('SELECT id, email, name, gender, status, description, photo_id, nickname FROM users')
            socket.emit('usersArray',users.rows)
        } catch (e) {
            console.log(e);         
        }finally{
            if (client) {
                client.release()
            }
        }
    })
    socket.on('fetch-messages',async(data)=>{
        let client
        try {
            client=await pool.connect()
            const messages=await client.query(`SELECT * FROM chat_room_messages WHERE chat_room_id = $1`,[data.chat_id])
            
            socket.emit('messages',messages.rows)
        } catch (e) {
            console.log(e); 
        }finally{
            if (client) {
                client.release()
            }
        }
    })
}