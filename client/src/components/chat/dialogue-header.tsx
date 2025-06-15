import { MainText } from "../../UI/main-text"
import { DialogueHeaderWrapper,InfoWrapper,NameOnlineWrapper,CompMessageWrapper } from "../../UI/chat/header"
import { $chat } from "../../store/chat-store"
import { useUnit } from "effector-react"
import { ProfilePic } from "../../UI/profile-pic"
import baseURL from "../../app-wide/constants"
import { CompatibilityScore } from "./compatibility-score"
import { LastMessageScore } from "./last-message-score"
import { useParams,useNavigate } from "react-router-dom"

export const DialogueHeader=() => {
    const params=useParams()
    const nav=useNavigate()
    const chatData=useUnit($chat)
    return(
        <DialogueHeaderWrapper>
            {chatData&&  
            <InfoWrapper>
                <ProfilePic src={baseURL+chatData.photo} $borderradius="50%" $width="50px" $height="50px" $cursorpointer onClick={()=>nav(`/profile/${params['*']}`)}/>
                <NameOnlineWrapper>
                    <MainText $fontsize="18px" $fontweight={500}>{chatData.name}</MainText>
                    <MainText $color={chatData.online? 'green' : 'blue'}>{chatData.online?'В сети':'Не в сети'}</MainText>
                </NameOnlineWrapper>
            </InfoWrapper>
            }
            {chatData !== null &&
            <CompMessageWrapper>
                <CompatibilityScore/>
                <LastMessageScore/>
            </CompMessageWrapper>}
        </DialogueHeaderWrapper>
    )
}