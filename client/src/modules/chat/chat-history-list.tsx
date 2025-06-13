import { ChatListWrapper } from "../../UI/chat/chat-history";
import { useUnit } from "effector-react";
import { fetchChatsFx,$chats } from "../../store/chat-store";
import { useEffect } from "react";
import { ChatHistory } from "../../components/chat/chat-history";
import { useNavigate} from "react-router-dom";
import { $currentChat } from "../../store/chat-store";
//Тут рендерим список компонентов Chat и вызываем api на fetch чатов


export const ChatHistoryList=() => {
    const nav=useNavigate()
    useEffect(()=>{
        fetchChatsFx()
    },[])
    const chats=useUnit($chats)
    const currentChat=useUnit($currentChat)
    return(
        <ChatListWrapper>
            {chats&& chats.names.map((name,ind)=>(
                <ChatHistory name={name}
                photo={chats.chatsPhotos[ind]}
                message={chats.lastMessages.message[ind]||'Напишите первое сообщение!'}
                timestamp={chats.lastMessages.timestamp[ind]||''}
                key={chats.ids[ind]}
                onClick={()=>{
                    const nickname=chats.nicknames[ind]
                    nickname!==currentChat&&nav(`/chat/${nickname}`)}}
                currentChat={currentChat===chats.nicknames[ind]}
                nickname={chats.nicknames[ind]}
                />
            ))}
        </ChatListWrapper>
    )
}