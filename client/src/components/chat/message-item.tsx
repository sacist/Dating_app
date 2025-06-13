import { Message } from "../../UI/chat/chat-main";
import { MainText } from "../../UI/main-text";
import styled from "styled-components";
interface IMessageItemProps{
    myMessage:boolean
    messageText:string
    firstInSeq:boolean
    lastInSeq:boolean
}
const Text=styled(MainText)`
`

export const MessageItem=({myMessage,messageText,firstInSeq,lastInSeq}:IMessageItemProps) => {
    return(
        <Message 
        $myMessage={myMessage} 
        $firstinseq={firstInSeq} 
        $lastinseq={lastInSeq}
        >
            <Text $fontsize="17px" $color={myMessage?'#ffffff' : '#000'}>{messageText}</Text>
        </Message>
    )
}