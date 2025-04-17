import { MatchmakingStartButton } from "../../UI/chat/matchmaking-start-button"
import { MatchmakingWindowWrapper } from "../../UI/chat/matchmaking-window"
import { MainText } from "../../UI/main-text"
import { useUnit } from "effector-react"
import { $socket } from "../../store/websocket/websocket-events"
import { $matching } from "../../store/matchmaking"
export const MatchmakingWindow=() => {
    const socket=useUnit($socket)
    const matching=useUnit($matching)
    
    return(
        <MatchmakingWindowWrapper>
            <MatchmakingStartButton onClick={()=>{
                socket?.emit('join-matchmaking')
            }}
            disabled={matching}
            />
            <MainText $fontsize="24px" $color="#c940a0" $nouserselect>Найти свою любовь</MainText>
        </MatchmakingWindowWrapper>
    )
}