import { ChatHeader } from "../../UI/chat/header";
import { MatchmakingWindow } from "./matchmaking-window";
import { DialogueHeader } from "../../components/chat/dialogue-header";
export const Header=() => {
    return(
        <ChatHeader>
            <MatchmakingWindow/>
            <DialogueHeader/>
        </ChatHeader>
    )
}