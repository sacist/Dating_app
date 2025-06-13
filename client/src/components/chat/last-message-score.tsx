import { MainText } from "../../UI/main-text";
import { $chat } from "../../store/chat-store"
import { useUnit } from "effector-react"
export const LastMessageScore=() => {

    const chat=useUnit($chat)
    return(
        <MainText>Последнее сообщение {chat&&'lastMessageScore' in chat ? chat.lastMessageScore:0}/100</MainText>
    )
}