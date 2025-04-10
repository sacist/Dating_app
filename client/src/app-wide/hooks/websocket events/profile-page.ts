import { useEffect } from "react"
import { useUnit } from "effector-react"
import { $socket } from "../../../store/websocket/websocket-events"
import { fetchProfilefx,updateOnlineStatus } from "../../../store/profile-store"
import { useParams } from "react-router-dom"


export const useProfileSocketEvent=() => {
    const {nickname}=useParams()
    const socket=useUnit($socket)
    useEffect(()=>{
        if (!nickname||!socket) return

        fetchProfilefx(nickname)
        
        socket.emit('join-profile',nickname)

        socket.on('profile-host-online',()=>{updateOnlineStatus(true)})
        socket.on('profile-host-offline',()=>{updateOnlineStatus(false)})
        return ()=>{
            socket.emit('leave-profile',nickname)
            socket.off('profile-host-online',()=>{updateOnlineStatus(true)})
            socket.off('profile-host-offline',()=>{updateOnlineStatus(false)})
        }
    },[nickname,socket])
}