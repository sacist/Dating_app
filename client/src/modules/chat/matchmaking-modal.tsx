import { MatchmakingModalWindow,MatchmakingModalWrapper } from "../../UI/chat/matchmaking/matchmaking-modal";
import { MMInfo } from "../../components/chat/matchmaking-modal-info";
import { MMButtons } from "../../components/chat/matchmaking-modal-buttons";
import { useUnit } from "effector-react";
import { $socket } from "../../store/websocket/websocket-events";
import { $matchData } from "../../store/matchmaking";

export const MatchmakingModal=() => {
    const socket=useUnit($socket)
    const roomId=useUnit($matchData)?.roomId
    return(
        <MatchmakingModalWrapper>
            <MatchmakingModalWindow>
                <MMInfo/>
                <MMButtons likeClick={()=>{socket?.emit('like',roomId)}} dislikeClick={()=>{socket?.emit('dislike',roomId)}}/>
            </MatchmakingModalWindow>
        </MatchmakingModalWrapper>
    )
}