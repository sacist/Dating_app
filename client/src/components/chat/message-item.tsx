import { Message } from "../../UI/chat/chat-main";
import { MainText } from "../../UI/main-text";

interface IMessageItemProps{
    myMessage:boolean
    messageText:string
    firstInSeq:boolean
    lastInSeq:boolean
}

export const MessageItem=({myMessage,messageText,firstInSeq,lastInSeq}:IMessageItemProps) => {
    return(
        <Message 
        $myMessage={myMessage} 
        $firstinseq={firstInSeq} 
        $lastinseq={lastInSeq}
        >
            <MainText $fontsize="17px" $color={myMessage?'#ffffff' : '#000'}>{messageText}</MainText>
        </Message>
    )
}