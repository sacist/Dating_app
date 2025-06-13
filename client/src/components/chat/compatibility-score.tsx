import { MainText } from "../../UI/main-text"
import { $chat } from "../../store/chat-store"
import { useUnit } from "effector-react"

export const CompatibilityScore=() => {

    const chat=useUnit($chat)
    return(
        <MainText>Совместимость {chat&&'compatibilityScore' in chat ? chat.compatibilityScore:0}/100</MainText>
    )
}