import { Header } from "../../modules"
import { ChatList } from "../../modules"
import { ChatPageWrapper,ChatMain } from "../../UI/chat/chat-page"
import { MatchmakingModal } from "../../modules/chat/matchmaking-modal"
import { $isOpenModal } from "../../store/matchmaking"
import { useUnit } from "effector-react"

export const ChatPage=() => {
    const isOpenModal=useUnit($isOpenModal)
    return(
        <ChatPageWrapper>
            {isOpenModal&&
            <MatchmakingModal/>
            }
            <Header/>
            <ChatMain>
                <ChatList/>
            </ChatMain>
        </ChatPageWrapper>
    )
}