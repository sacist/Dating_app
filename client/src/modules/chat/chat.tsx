import { $chat,$inputHeight } from "../../store/chat-store"
import { MessagesWrapper,ChatWrapper } from "../../UI/chat/chat-main"
import { useUnit } from "effector-react"
import { MessageItem } from "../../components/chat/message-item"
import { fetchChatFx } from "../../store/chat-store";
import { useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { ErrorChatMessage } from "../../UI/chat/chat-error-message";
import { MessageInput } from "../../components/chat/chat-input";
import { $socket } from "../../store/websocket/websocket-events";

export const Chat=() => {
    const chatData=useUnit($chat)
    const {nickname}=useParams()
    const socket=useUnit($socket)
    const scrollIntoViewRef=useRef<HTMLDivElement>(null)
    const inputHeight=useUnit($inputHeight)
    
    useEffect(()=>{
        if(!nickname) return
        const controller=new AbortController()
        const signal=controller.signal
        fetchChatFx({nickname,signal})
        return ()=>{
            controller.abort()
        }
    },[nickname])
    useEffect(()=>{
        if(chatData && 'messages' in chatData){
            socket?.emit('enter-chat',chatData?.messages[0].chat_room_id)
        }else{
            socket?.emit('enter-chat',chatData?.chatId)
        }
        if(scrollIntoViewRef){
            scrollIntoViewRef.current?.scrollIntoView({behavior:"smooth"})
        }
        return()=>{
            if(chatData && 'messages' in chatData){
                socket?.emit('leave-chat',chatData?.messages[0].chat_room_id)
            }else{
                socket?.emit('leave-chat',chatData?.chatId)
            } 
        }
    },[chatData])
    return(
        <ChatWrapper>
            <MessagesWrapper $inputheight={inputHeight}>
                {chatData&&'error' in chatData?
                <ErrorChatMessage $fontsize="22px">{chatData.error}</ErrorChatMessage>
                :
                chatData&&'messages' in chatData &&
                chatData.messages.map((message,ind,messages)=>(
                    <MessageItem
                    myMessage={message.myMessage}
                    key={message.id}
                    messageText={message.message}
                    lastInSeq={messages[ind+1]?.user_id!==message.user_id||!messages[ind+1]}
                    firstInSeq={(messages[ind-1]?.user_id!==message.user_id||!messages[ind-1])&&ind!==0}
                    />
                ))
                }
                <div ref={scrollIntoViewRef}/>    
            </MessagesWrapper>
            <MessageInput key={nickname}/>
        </ChatWrapper>
    )
}

