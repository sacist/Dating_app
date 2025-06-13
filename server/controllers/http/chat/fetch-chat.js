const pool = require('../../../config/db')
const { nicknameIdCache,photoCache } = require('../../../caching')
const fetchChat = async (req, res) => {
    let client
    const userId = req.userId
    const { nickname } = req.params
    try {
        client = await pool.connect()
        let opponentId
        if (nicknameIdCache.has(nickname)) {
            opponentId = nicknameIdCache.get(nickname).rows[0].id
        } else {
            const idQuery = await client.query(`SELECT id FROM users WHERE nickname ILIKE $1`, [nickname])
            if(idQuery.rows.length===0){
                return res.status(404).json({error:`Пользователя ${nickname} не существует`})
            }
            opponentId = idQuery.rows[0].id
            nicknameIdCache.set(nickname, idQuery)
        }
        
        const nameOnlineStatusQuery=await client.query(`SELECT online,name FROM users WHERE id=$1`,[opponentId])
        const onlineStatus=nameOnlineStatusQuery.rows[0].online
        const name=nameOnlineStatusQuery.rows[0].name
        let photo
        if(photoCache.has(opponentId)){
            photo=photoCache.get(opponentId).rows[0].photo_link        
        }else{
            const photoInfo=await client.query(`SELECT photo_link FROM photos WHERE user_id = $1`,[opponentId])
            photo=photoInfo.rows[0].photo_link
            photoCache.set(opponentId,photoInfo)
        }

        const chatRoomIdQuery = await client.query(`
        SELECT chat_room_id
        FROM chat_members
        WHERE user_id = $1 OR user_id = $2
        GROUP BY chat_room_id
        HAVING COUNT(DISTINCT user_id) = 2`, [userId,opponentId])
        if(chatRoomIdQuery.rows.length===0){
            return res.status(403).json({error:'Вы не можете самостоятельно начать чат',online:onlineStatus,photo,name})
        }
        const chatId=chatRoomIdQuery.rows[0].chat_room_id
        const chatMessagesQuery = await client.query(`SELECT * FROM chat_room_messages WHERE chat_room_id = $1 ORDER BY timestamp ASC`, [chatId])
        if (chatMessagesQuery.rows.length === 0) return res.status(404).json({ error: 'Напишите первое сообщение!',chatId,online:onlineStatus,photo,name })
        const lastMessageScore=chatMessagesQuery.rows[chatMessagesQuery.rows.length-1].message_score
        const compatibilityScoreQuery=await client.query(`SELECT compatibility_score FROM chat_room WHERE id = $1`,[chatId])
        const compatibilityScore=compatibilityScoreQuery.rows[0].compatibility_score
        for (const entry of chatMessagesQuery.rows) {
            entry.myMessage = userId === entry.user_id
        }
        return res.json({ messages: chatMessagesQuery.rows,photo,online:onlineStatus,name,lastMessageScore,compatibilityScore })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Ошибка на сервере' })

    } finally {
        if (client) {
            client.release()
        }
    }
}

module.exports = { fetchChat }