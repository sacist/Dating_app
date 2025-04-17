import { useEffect } from "react"
import { $socket } from "../../store/websocket/websocket-events"
import { useUnit } from "effector-react"
import { setNotification,setNotificationError } from "../../store/notification"
import { ImatchedProfile } from "../../app-wide/types/types"
import { setMatching } from "../../store/matchmaking"

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
            console.log(data);
        })
        socket.on('matching-error',()=>{
            setMatching(false)
            setNotificationError(true)
            setNotification('Ошибка при поиске. Повторите попытку позже')
        })
    },[socket])
}