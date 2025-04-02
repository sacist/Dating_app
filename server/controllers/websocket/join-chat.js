const pool=require('../../config/db')

module.exports=(io,socket)=>{
    socket.on('join-chat',async({chatRoomId, userId})=>{
        let client
        try {
            client=await pool.connect()
            const query=await client.query(`SELECT * FROM chat_members WHERE chat_room_id = $1`,[chatRoomId])
            let containsUser=false
            for (const row of query.rows){
                if(row.user_id===userId){   
                    containsUser=true
                    break
                }
            }
            if (!containsUser) {
                return
            }
            socket.join(chatRoomId)
        } catch (e) {
            console.log(e);        
        }finally{
            if (client) {
                client.release()
            }
            
        }
        
    })
}