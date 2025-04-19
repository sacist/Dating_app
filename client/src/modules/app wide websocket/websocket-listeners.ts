import { useEffect } from "react"
import { $socket } from "../../store/websocket/websocket-events"
import { useUnit } from "effector-react"
import { setNotification,setNotificationError } from "../../store/notification"
import { ImatchedProfile } from "../../app-wide/types/types"
import { setMatching,setMatchData } from "../../store/matchmaking"
import { setIsOpenModal } from "../../store/matchmaking"
import { setBackground } from "../../store/notification"

export const useWebsocketListeners=() => {
    const socket=useUnit($socket)

    useEffect(()=>{
        if(!socket) return
        socket.on('entered-matchmaking',()=>{
            setMatching(true)
            setNotification('Подбираем подходящую пару...')    
        })
        socket.on('match-found',(data:ImatchedProfile)=>{
            setMatching(false)
            setNotification('')
            setMatchData(data)
            setIsOpenModal(true)
            console.log(data);
        })
        socket.on('matching-error',()=>{
            setMatching(false)
            setNotificationError(true)
            setNotification('Ошибка при поиске. Повторите попытку позже')
        })
        socket.on('got-like',()=>{
            setNotification('Вас лайкнули!')
            setBackground('#ffb6c1')
        })
        socket.on('match-success',()=>{
            setNotification('Взаимная симпатия!')
            setBackground('#ffb6c1')
            setIsOpenModal(false)
        })
        socket.on('got-dislike',()=>{
            setNotification('Вас отвергли')
            setBackground('rgba(243, 96, 96, 0.8)')
        })
        socket.on('matchmaking-dismissed',()=>{
            setIsOpenModal(false)
            socket.emit('join-matchmaking')
        })
    },[socket])
}