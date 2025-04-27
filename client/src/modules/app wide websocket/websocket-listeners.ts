import { useEffect } from "react"
import { $socket } from "../../store/websocket/websocket-events"
import { useUnit } from "effector-react"
import { onEnteredMatchmaking,onGotDislike,onGotLike,onMatchFound,
    onMatchSuccess,onMatchingError,onMatchmakingDismissed,onGotNewMessage } from "./websocket-funcs"
import { $matchData } from "../../store/matchmaking"
import { useNavigate } from "react-router-dom"
import { fetchChatsFx } from "../../store/chat-store"
export const useWebsocketListeners=() => {
    const socket=useUnit($socket)
    const matchData=useUnit($matchData)
    const navigate=useNavigate()

    useEffect(() => {
        if (!socket) return

        const handleMatchSuccess = () => onMatchSuccess(() => {
            navigate(`/chat/${matchData?.match.nickname}`)
            fetchChatsFx()
        })
        const handleMatcmakingDismissed=()=>onMatchmakingDismissed(socket)
        
        socket.on('entered-matchmaking', onEnteredMatchmaking)
        socket.on('match-found', onMatchFound)
        socket.on('matching-error', onMatchingError)
        socket.on('got-like', onGotLike)
        socket.on('match-success', handleMatchSuccess)
        socket.on('got-dislike', onGotDislike)
        socket.on('matchmaking-dismissed', handleMatcmakingDismissed)
        socket.on('got-new-message',onGotNewMessage)
        
        return () => {
            socket.off('entered-matchmaking', onEnteredMatchmaking)
            socket.off('match-found', onMatchFound)
            socket.off('matching-error', onMatchingError)
            socket.off('got-like', onGotLike)
            socket.off('match-success', handleMatchSuccess)
            socket.off('got-dislike', onGotDislike)
            socket.off('matchmaking-dismissed', handleMatcmakingDismissed)
            socket.off('got-new-message',onGotNewMessage)
        }
    }, [socket, matchData, navigate])
};