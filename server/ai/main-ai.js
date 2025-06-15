const axios = require('axios');
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

function cleanResponse(text) {
    // Извлекаем содержимое из тройных бэктиков, если есть
    const tripleBackticksMatch = text.match(/```(?:\w*\n)?([\s\S]*?)```/);
    let content = tripleBackticksMatch ? tripleBackticksMatch[1] : text;

    // Удаляем лишние теги
    content = content.replace(/<\/think>/g, '');

    // Убираем тройные бэктики, если остались
    content = content.replace(/```/g, '');

    // Обрезаем кавычки и пробелы с краев
    content = content.trim().replace(/^["'«»“”„`]+|["'«»“”„`]+$/g, '').trim();

    // Разбиваем на строки и чистим каждую
    const lines = content.split('\n');
    const cleanedLines = lines.map(line => line.replace(/\s+/g, ' ').trim());

    // Собираем обратно
    return cleanedLines.join('\n').trim();
}

async function resetExpiredKeys(dbClient) {
    try {
        await dbClient.query(`
            UPDATE api_keys
            SET used = FALSE, last_reset = now()
            WHERE used = TRUE AND last_reset < now() - interval '24 hours'
        `);
        console.log("Просроченные ключи сброшены");
    } catch (e) {
        console.error("Ошибка при сбросе ключей:", e);
    }
}

async function markKeyUsed(dbClient, keyId) {
    try {
        await dbClient.query("UPDATE api_keys SET used = true WHERE id = $1", [keyId]);
        console.log(`Ключ id=${keyId} помечен как использованный`);
    } catch (e) {
        console.error(`Ошибка при пометке ключа id=${keyId} как использованного:`, e);
    }
}

async function getAiResponse(dbClient, prompt, systemPrompt) {
    /**
     * Универсальная функция для получения ответа от AI.
     * 
     * @param {object} dbClient - Клиент PostgreSQL
     * @param {string} prompt - Пользовательский запрос
     * @param {string} systemPrompt - Системный промпт (можно передавать разные роли)
     * @return {Promise<string|null>} Ответ от модели или null
     */
    
    try {
        await resetExpiredKeys(dbClient);

        // Получаем доступные ключи
        const { rows: keys } = await dbClient.query(
            "SELECT id, api_key FROM api_keys WHERE used = false ORDER BY id"
        );
        
        if (!keys.length) {
            console.warn("Нет доступных API ключей");
            return null;
        }

        const headersTemplate = {
            "Content-Type": "application/json",
        };

        for (const keyRow of keys) {
            const keyId = keyRow.id;
            const apiKey = keyRow.api_key;
            
            const headers = {
                ...headersTemplate,
                "Authorization": `Bearer ${apiKey}`
            };

            const jsonData = {
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                temperature: 0.9,
                max_tokens: 1000,
            };

            try {
                const response = await axios.post(OPENROUTER_API_URL, jsonData, {
                    headers,
                    timeout: 15000
                });

                console.log(`HTTP Request: POST ${OPENROUTER_API_URL} - ${response.status}`);

                if (response.status === 200) {
                    const content = response.data.choices[0].message.content;
                    console.log(`Ответ от модели: ${content}`);
                    return cleanResponse(content);
                } else if (response.status === 429) {
                    console.warn(`Ключ id=${keyId} исчерпан (429 Too Many Requests)`);
                    await markKeyUsed(dbClient, keyId);
                } else {
                    console.error(`Ошибка API (${response.status}): ${response.data}`);
                    await markKeyUsed(dbClient, keyId);
                }
            } catch (e) {
                console.error(`Ошибка запроса к OpenRouter API с ключом id=${keyId}:`, e);
                await markKeyUsed(dbClient, keyId);
            }
        }

        console.warn("Все ключи исчерпаны или недоступны");
        return null;
    } catch (e) {
        console.error("Ошибка в функции getAiResponse:", e);
        return null;
    }
}

module.exports = {
    getAiResponse,
    cleanResponse
};