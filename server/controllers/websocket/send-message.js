const cleanMessage = (msg) => {
    return msg
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
};
const pool = require('../../config/db')
const { subscriptionCache, genderCache } = require('../../caching')

module.exports = (io, socket) => {
    socket.on('send-message', async (data) => {
        let client
        let hasSubscription
        const userId = socket.userId
        let compatScore
        let messageScore
        let gender
        try {
            if (!data.message || data.message.length > 10000) {
                socket.emit('message-is-too-long')
                return
            }
            client = await pool.connect()
            if (subscriptionCache.has(userId)) {
                hasSubscription = subscriptionCache.get(userId)
            } else {
                const subscriptionQuery = await client.query(`SELECT has_subscription FROM users WHERE id =$1`, [userId])
                hasSubscription = subscriptionQuery.rows[0].has_subscription
                subscriptionCache.set(userId, hasSubscription)
            }
            if (hasSubscription) {
                const scoresQuery=await client.query(`SELECT compatibility,last_message_score FROM chat_room WHERE id=$1`,[data.chat_id])
                compatScore=scoresQuery.rows[0].compatibility
                messageScore=scoresQuery.rows[0].last_message_score

                const messagesQuery = await client.query(`SELECT message,user_id FROM chat_room_messages WHERE chat_room_id =$1`, [data.chat_id])
                const messages = []
                const genders = []
                for (const { message, user_id } of messagesQuery.rows.slice(-100)) {
                    if (genderCache.has(user_id)) {
                        genders.push(genderCache.get(user_id))
                    } else {
                        const genderQuery = await client.query(`SELECT gender FROM users WHERE id=$1`, [user_id])
                        const gender = genderQuery.rows[0].gender
                        genderCache.set(user_id, gender)
                        genders.push(gender)
                    }
                    messages.push(message)
                }
                
                if (genderCache.has(userId)) {
                    gender=genderCache.get(userId)
                } else {
                    const genderQuery = await client.query(`SELECT gender FROM users WHERE id=$1`, [userId])
                    gender = genderQuery.rows[0].gender
                    genderCache.set(userId, gender)
                }
                const jsons = messages.map((msg, ind) => {
                    return {
                        message: cleanMessage(msg),
                        gender: genders[ind]
                    }
                })
                const newMessage=data.message
                const prompt={
                    compatibilityScore:compatScore,
                    lastMessageScore:messageScore,
                    jsons,
                    newMessage:{
                        newMessage,
                        gender
                    }
                }

                console.log(prompt);
                
            }
            const newMessage = await client.query(`INSERT INTO chat_room_messages
                 (chat_room_id,user_id,message) VALUES ($1,$2,$3) RETURNING *`, [data.chat_id, userId, data.message])
            const message = newMessage.rows[0]
            const roomSockets = await io.in(`chat-${data.chat_id}`).fetchSockets();
            for (const roomSocket of roomSockets) {
                const userId = roomSocket.userId
                roomSocket.emit('got-new-message', { ...message, myMessage: userId === message.user_id })
            }
        } catch (e) {
            console.log(e);
        } finally {
            if (client) {
                client.release()
            }
        }
    })
}