import { setMatching, setMatchData, setIsOpenModal } from "../../store/matchmaking"
import { setBackground, setNotification } from "../../store/notification"
import { ImatchedProfile } from "../../app-wide/types/types"
import { Socket } from "socket.io-client"
import { addNewMessage } from "../../store/chat-store"
import { IMessage } from "../chat/api/fetch-chat"

export const onEnteredMatchmaking = () => {
    setMatching(true)
    setBackground('rgba(76, 175, 80, 0.9)')
    setNotification('Подбираем подходящую пару...')
}

export const onMatchFound = (data: ImatchedProfile) => {
    setMatching(false)
    setMatchData(data)
    setIsOpenModal(true)
    setTimeout(() => {
        setNotification('')
    }, 1500)
}

export const onMatchingError = () => {
    setMatching(false)
    setNotification('Ошибка при поиске. Повторите попытку позже')
    setBackground('rgba(243, 96, 96, 0.8)')
}

export const onGotLike = () => {
    setNotification('Вас лайкнули!')
    setBackground('#ffb6c1')
}

export const onGotDislike = () => {
    setNotification('Вас отвергли')
    setBackground('rgba(243, 96, 96, 0.8)')
}

export const onMatchSuccess = (navigate:()=>void) => {
    setNotification('Взаимная симпатия!')
    setBackground('#ffb6c1')
    setIsOpenModal(false)
    navigate()
}

export const onMatchmakingDismissed = (socket:Socket) => {
    setIsOpenModal(false)
    socket.emit('join-matchmaking')
}

export const onGotNewMessage=(message:IMessage)=>{
    addNewMessage(message)
}