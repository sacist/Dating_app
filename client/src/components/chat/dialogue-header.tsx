import { MainText } from "../../UI/main-text"
import { DialogueHeaderWrapper,InfoWrapper,NameOnlineWrapper } from "../../UI/chat/header"
import { $chat } from "../../store/chat-store"
import { useUnit } from "effector-react"
import { ProfilePic } from "../../UI/profile-pic"
import baseURL from "../../app-wide/constants"
export const DialogueHeader=() => {
    const chatData=useUnit($chat)
    return(
        <DialogueHeaderWrapper>
            {chatData&&  
            <InfoWrapper>
                <ProfilePic src={baseURL+chatData.photo} $borderradius="50%" $width="50px" $height="50px"/>
                <NameOnlineWrapper>
                    <MainText $fontsize="18px" $fontweight={500}>{chatData.name}</MainText>
                    <MainText $color={chatData.online? 'green' : 'blue'}>{chatData.online?'В сети':'Не в сети'}</MainText>
                </NameOnlineWrapper>
            </InfoWrapper>
            }
        </DialogueHeaderWrapper>
    )
}