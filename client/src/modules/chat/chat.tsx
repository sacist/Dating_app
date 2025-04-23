import { $chat } from "../../store/chat-store"
import { MessagesWrapper } from "../../UI/chat/chat-main"
import { useUnit } from "effector-react"
import { MessageItem } from "../../components/chat/message-item"
import { fetchChatFx } from "../../store/chat-store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export const Chat=() => {
    const chatData=useUnit($chat)
    const {nickname}=useParams()
    useEffect(()=>{
        if(nickname)
        fetchChatFx(nickname)
    },[nickname])
    return(
        <MessagesWrapper>
            {typeof chatData==='string'?chatData:
            chatData&&typeof chatData!=='string' &&
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
            
        </MessagesWrapper>
    )
}