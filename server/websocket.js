const { Server } = require('socket.io');
const notificationController=require('./controllers/websocket/connect-notif')
const socketAuthMiddleware = require('./middleware/websocket/socket-auth');
const sendMessageController=require('./controllers/websocket/send-message')
const joinChatController=require('./controllers/websocket/join-chat')
const onlineStatusController=require('./controllers/websocket/profile-online-status')
const matchmakingController=require('./controllers/websocket/matchmaking')
const matchSystemController=require('./controllers/websocket/match-system')
const pool=require('./config/db')
module.exports=(server,corsOptions)=>{
    const io=new Server(server,{
        cors:corsOptions
    })
    io.use(socketAuthMiddleware);
    io.on('connection',(socket)=>{
        console.log(`Клиент подключился ${socket.id}`);
        notificationController(io,socket)
        sendMessageController(io,socket)
        joinChatController(io,socket)
        onlineStatusController(io,socket)
        matchmakingController(io,socket)
        matchSystemController(io,socket)
        socket.on('disconnect',async()=>{
            io.to(`profile-${socket.nickname}`).emit('profile-host-offline')
            console.log(`Клиент отключился ${socket.id}`);
            let client
            try {
                client=await pool.connect()
                await client.query('UPDATE users SET online = false WHERE id = $1',[socket.userId])
            } catch (e) {
                console.log(e);         
            }finally{
                if(client){
                    client.release()
                }
            }
        })
    })
}