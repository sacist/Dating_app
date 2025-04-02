const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const http = require('http');
const router=require('./routers/main')
const path = require('path');
const axios=require('axios')

const { createTables } = require('./config/create-tables');

const app = express()

const port = 3000

let corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://192.168.0.105:5173'
    ],
    credentials:true
}
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', router)
app.use('/photos', express.static(path.join(__dirname, './photos')));

const server=http.createServer(app)

require('./websocket')(server,corsOptions)

const start=async() => {
    await createTables()
    server.listen(port, '0.0.0.0', () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
}


// async function askDeepSeek(_, message) {
//     const parsedMessage = JSON.parse(message);
  
//     const previousMessages = JSON.stringify(
//       parsedMessage.previous_messages,
//       null,
//       2
//     );
//     const newMessage = JSON.stringify(parsedMessage.new_message, null, 2);
  
//     const response = await axios.post(
//       "http://localhost:11434/api/generate",
//       {
//         model: "deepseek-r1:7b",
//         prompt: configurePrompt(previousMessages, newMessage),
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//         responseType: "stream",
//       }
//     );
  
//     const stream = response.data;
//     let fullResponse = "";
  
//     stream.on("data", (data) => {
//       const dataString = data.toString();
//       try {
//         const jsonData = JSON.parse(dataString);
//         fullResponse += jsonData.response;
//         process.stdout.write("\x1Bc");
//         console.log(fullResponse);
//       } catch (e) {}
//     });
//   }

//   const configurePrompt = (previousMessages, newMessage) => {
//     return `Ты профессиональный психолог-консультант приложения знакомств с 10-летним опытом. 
//     Твоя задача - анализировать диалоги по 3 ключевым аспектам:
//     1. Эмоциональная безопасность
//     2. Потенциал совместимости
//     3. Социальная адекватность
  
//   🔹 **Твоя задача:**  
//   - Оцени **каждое сообщение** (0-100), насколько оно способствует построению романтических отношений пары.  
//   - Оцени **коэффициент совместимости** (0-100) по стилю общения, общим интересам и реакции. Очень важно оценить готовность пары продолжить общение вне сайта знакомств  
//   - **Учитывай весь прошлый контекст**, который дан в формате JSON.
  
//     ***Если ты обнаружишь хоть какой то намёк на мошенничество или вымогательство, шантаж или угрозу безопасности любого из участников 
//     или же угрозу найти человека вне сети оценки должны стать 0***


//   ❌ **Не добавляй объяснения! Только JSON-ответ.**  
//   ✅ **Формат ответа (ТОЛЬКО JSON, без текста перед ним!):**  
//   \`\`\`json
//   {
//     "message_score": число от 0 до 100,
//     "compatibility": число от 0 до 100
//   }
//   \`\`\`
  
//   🔹 **Пример:**  
//   **Сообщение:** "Привет, малышка."  
//   ✅ **Ответ:**
//   \`\`\`json
//   {
//     "message_score": 50,
//     "compatibility": 20
//   }
//   \`\`\`
  
//   📌 **Контекст переписки (учитывай его в анализе, включая оценки и гендер):**  
//   \`\`\`json
//   ${previousMessages}
//   \`\`\`
  
//   💬 **Новое сообщение:**  
//   \`\`\`json
//   ${newMessage}
//   \`\`\`
  
//   👉 **Ответь только JSON, без комментариев и без think!**`;
//   };

// askDeepSeek(
//     `assess message using established rules.`,
//     `{
//         "previous_messages": [
//             {
//                 "message": "Привет!",
//                 "options": {
//                     "message_score": 50,
//                     "compatibility": 20,
//                     "gender": "male"
//                 }
//             },
//             {
//                 "message": "Привет, красавчик!",
//                 "options": {
//                     "message_score": 60,
//                     "compatibility": 40,
//                     "gender": "female"
//                 }
//             },
//             {
//                 "message": "Мне очень нравится как ты выглядишь?",
//                 "options": {
//                     "message_score": 75,
//                     "compatibility": 90,
//                     "gender": "male"
//                 }
//             }
//         ],
//         "new_message": {
//             "message": "Ооо, спасибки, ты такой милый. Люблю",
//             "options": {"gender": "female"}
//         }
//     }`
// );


start()