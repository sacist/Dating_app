import { Header } from "../../modules"
import { ChatHistoryList } from "../../modules"
import { ChatPageWrapper,ChatMain } from "../../UI/chat/chat-page"
import { MatchmakingModal } from "../../modules"
import { $isOpenModal } from "../../store/matchmaking"
import { useUnit } from "effector-react"
import { Chat } from "../../modules"
import { Route,Routes } from "react-router-dom"
import { useEffect } from "react"
import { Copilot } from "../../modules"
export const ChatPage=() => {
    const isOpenModal=useUnit($isOpenModal)
    useEffect(()=>{
        document.title='Чаты'
    },[])
    return(
        <ChatPageWrapper>
            {isOpenModal&&
            <MatchmakingModal/>
            }
            <Header/>
            <ChatMain>
                <ChatHistoryList/>
                <Routes>
                    <Route element={
                    <Chat/> 
                    } path=":nickname"/>
                </Routes>
                <Copilot/>
            </ChatMain>
        </ChatPageWrapper>
    )
}