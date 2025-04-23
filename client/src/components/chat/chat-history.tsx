import { ChatWrapper,ColumnWrapper,NameTimestampWrapper } from "../../UI/chat/chat-history"
import { ProfilePic } from "../../UI/profile-pic"
import { messageItem } from "../../app-wide/types/types"
import baseURL from "../../app-wide/constants"
import { MainText } from "../../UI/main-text"
import { MessageText } from "../../UI/chat/chat-history"

interface IChatHistoryProps{
    photo:string
    name:string
    message:messageItem
    timestamp:messageItem
    onClick:()=>void
    currentChat:boolean
}

export const ChatHistory=({photo,name,message,timestamp,onClick,currentChat}:IChatHistoryProps) => {
    return (
        <ChatWrapper onClick={onClick} $currentchat={currentChat}>
            <ProfilePic src={baseURL+photo} alt="Фото профиля"/>
            <ColumnWrapper>
                <NameTimestampWrapper>
                    <MainText $fontsize="18px" $color={currentChat?'#ffff':''}>{name}</MainText>
                    <MainText $fontsize="14px" $color={currentChat?'#ffff':'#6b7280'}>{timestamp.toString().slice(0,4)}</MainText>
                </NameTimestampWrapper>
                <MessageText $color={currentChat?'#ffff':'#6b7280'}>{message}</MessageText>
            </ColumnWrapper>
        </ChatWrapper>
    )
}