const pool=require('../../../config/db')
const {photoCache}=require('../../../caching')
const fetchChats=async (req,res) => {
    const userId=req.userId
    let client
    try {
        client=await pool.connect()

        const chatIds=[]

        const chatsIdsQuery= await client.query(`SELECT chat_room_id FROM chat_members WHERE user_id = $1`,[userId])

        if(chatsIdsQuery.rows.length===0){
            return res.status(404).json({error:'Чатов не найдено'})
        }
        for(const entry of chatsIdsQuery.rows){
            chatIds.push(entry.chat_room_id)
        }
        const chats=[]

        for await (const entry of chatsIdsQuery.rows) {
            const chatId = entry.chat_room_id;
            const chatQuery = await client.query(`SELECT user_id FROM chat_members WHERE chat_room_id = $1`, [chatId]);
            const chatUsers = chatQuery.rows.map(row => row.user_id).filter(id => id !== userId);
            chats.push(...chatUsers);
        }
        const chatsPhotos=[]
        const names=[]
        const lastMessages={message:[],timestamp:[]}
        const nicknames=[]
        for(let i=0;i<chats.length;i++){
            const chat=chats[i]
            if(photoCache.has(chat)){
                chatsPhotos.push(photoCache.get(chat).rows[0].photo_link)
            }else{
                const photoInfo=await client.query(`SELECT photo_link FROM photos WHERE user_id = $1`,[chat])
                chatsPhotos.push(photoInfo.rows[0].photo_link)
            }

            const nameQuery=await client.query(`SELECT name,nickname FROM users WHERE id = $1`,[chat])
            names.push(nameQuery.rows[0].name)
            nicknames.push(nameQuery.rows[0].nickname)

            const lastMessageQuery=await client.query(`SELECT message,timestamp FROM chat_room_messages WHERE chat_room_id=$1 ORDER BY timestamp DESC LIMIT 1`,
                [chatsIdsQuery.rows[i].chat_room_id]
            )
            if(lastMessageQuery.rows.length!==0){
                lastMessages.message.push(lastMessageQuery.rows[0].message)
                lastMessages.timestamp.push(lastMessageQuery.rows[0].timestamp)
            }else{
                lastMessages.message.push(false)
                lastMessages.timestamp.push(false)
            }
        }

        return res.json({chatsPhotos,names,lastMessages,ids:chatIds,nicknames})      
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:'Ошибка на сервере'})       
    }finally{
        if (client) {
            client.release()
        }
    }
}

module.exports={fetchChats}