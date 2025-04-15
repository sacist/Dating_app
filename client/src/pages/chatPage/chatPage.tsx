import { Header } from "../../modules"
import { ChatList } from "../../modules"
import { ChatPageWrapper,ChatMain } from "../../UI/chat/chat-page"
export const ChatPage=() => {
    return(
        <ChatPageWrapper>
            <Header/>
            <ChatMain>
                <ChatList/>
            </ChatMain>
        </ChatPageWrapper>
    )
}