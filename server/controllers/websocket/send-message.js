const cleanMessage = (msg) => msg.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

const pool = require('../../config/db');
const { subscriptionCache, genderCache } = require('../../caching');
const { getAssistentAnalysys } = require('../../ai/assistent-ai');

const lastCompatUpdateCache = new Map();

const createJSONs = (messages, genders, msgScores) => 
    messages.map((msg, i) => ({
        message: cleanMessage(msg),
        gender: genders[i],
        message_score: msgScores[i]
    }));

async function updateScores(client, chatId, compatScore, messageId, messageScore) {
    const now = Date.now();
    const lastUpdate = lastCompatUpdateCache.get(chatId) || 0;
    
    try {
        await client.query('BEGIN');
        
        // Обновляем только если прошло 5+ секунд
        if (now - lastUpdate >= 5000) {
            await client.query(
                `UPDATE chat_room SET compatibility_score = $1 WHERE id = $2`,
                [compatScore, chatId]
            );
            lastCompatUpdateCache.set(chatId, now);
        }
        
        await client.query(
            `UPDATE chat_room_messages SET message_score = $1 WHERE id = $2`,
            [messageScore, messageId]
        );
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Ошибка при обновлении оценок:', e);
    }
}

module.exports = (io, socket) => {
    socket.on('send-message', async (data) => {
        if (!data.message || data.message.length > 10000) {
            return socket.emit('message-is-too-long');
        }

        const userId = socket.userId;
        const client = await pool.connect();
        
        try {
            // 1. Отправляем сообщение
            const { rows: [message] } = await client.query(
                `INSERT INTO chat_room_messages (chat_room_id, user_id, message) 
                 VALUES ($1, $2, $3) RETURNING id, message, user_id, timestamp`,
                [data.chat_id, userId, data.message]
            );

            // Рассылаем сообщение
            const roomSockets = await io.in(`chat-${data.chat_id}`).fetchSockets();
            roomSockets.forEach(s => s.emit('got-new-message', { 
                ...message, 
                myMessage: s.userId === userId 
            }));

            // 2. AI анализ для подписчиков
            const { rows: [{ has_subscription, gender: userGender }] } = await client.query(
                `SELECT u.has_subscription, u.gender 
                 FROM users u WHERE u.id = $1`,
                [userId]
            );

            if (!has_subscription) return;

            // Получаем данные для анализа
            const { rows: messages } = await client.query(
                `SELECT crm.id, crm.message, crm.user_id, crm.message_score, u.gender
                 FROM chat_room_messages crm
                 JOIN users u ON crm.user_id = u.id
                 WHERE crm.chat_room_id = $1
                 ORDER BY crm.timestamp DESC LIMIT 100`,
                [data.chat_id]
            );

            const compatScore = (await client.query(
                `SELECT compatibility_score FROM chat_room WHERE id = $1`,
                [data.chat_id]
            )).rows[0].compatibility_score;

            // Формируем промпт
            const prompt = {
                compatibilityScore: compatScore,
                previous_messages: messages.map(m => ({
                    message: cleanMessage(m.message),
                    gender: m.gender,
                    message_score: m.id === message.id ? 0 : m.message_score
                })).reverse(),
                newMessage: {
                    newMessage: data.message,
                    gender: userGender
                }
            };

            // Анализ в фоне
            getAssistentAnalysys(client, JSON.stringify(prompt))
                .then(res => {
                    try {
                        const analysis = JSON.parse(res);
                        
                        // Отправляем только автору сообщения
                        socket.emit('ai-reasoning', {
                            messageId: message.id,
                            analysis: analysis.analysis,
                            compatibilityScore: analysis.compatibilityScore,
                            newMessageScore: analysis.newMessageScore
                        });

                        updateScores(
                            client,
                            data.chat_id,
                            analysis.compatibilityScore,
                            message.id,
                            analysis.newMessageScore
                        );
                    } catch (e) {
                        console.error('Ошибка обработки AI ответа:', e);
                    }
                })
                .catch(console.error);
        } catch (e) {
            console.error('Ошибка в send-message:', e);
        } finally {
            client.release();
        }
    });
};