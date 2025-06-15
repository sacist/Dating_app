import { CopilotWrapper } from "../../UI/chat/copilot"
import { CopilotHeader } from "../../components/chat/copilot-header"
import { $chat } from "../../store/chat-store"
import { useUnit } from "effector-react"
import { useParams } from "react-router-dom"
export const Copilot=() => {
    const params=useParams()
    const haveActiveChat=useUnit($chat) !== null && params['*'] !== ''
    return(
        <CopilotWrapper $haveactivechat={haveActiveChat}>
            <CopilotHeader/>
        </CopilotWrapper>
    )
}