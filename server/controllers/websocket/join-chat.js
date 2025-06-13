module.exports=(io,socket)=>{
    socket.on('enter-chat',(chatId)=>{
        socket.join(`chat-${chatId}`)
        console.log(`Вход в чат ${chatId}`);
        
    })
    socket.on('leave-chat',(chatId)=>{
        socket.leave(`chat-${chatId}`)
        console.log(`Выход из чата ${chatId}`);
    })
}