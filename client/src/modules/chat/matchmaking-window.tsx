import { MatchmakingStartButton } from "../../UI/chat/matchmaking-start-button"
import { MatchmakingWindowWrapper } from "../../UI/chat/matchmaking-window"

export const MatchmakingWindow=() => {
    return(
        <MatchmakingWindowWrapper>
            <MatchmakingStartButton onClick={()=>{}}/>
        </MatchmakingWindowWrapper>
    )
}