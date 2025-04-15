import { MatchmakingStartButton } from "../../UI/chat/matchmaking-start-button"
import { MatchmakingWindowWrapper } from "../../UI/chat/matchmaking-window"
import { MainText } from "../../UI/main-text"


export const MatchmakingWindow=() => {
    return(
        <MatchmakingWindowWrapper>
            <MatchmakingStartButton onClick={()=>{}}/>
            <MainText $fontsize="24px" $color="#c940a0" $nouserselect>Найти свою любовь</MainText>
        </MatchmakingWindowWrapper>
    )
}