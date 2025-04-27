import { ChatInput,InputWrapper,SendButton } from "../../UI/chat/chat-input";
import { useState,useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { useUnit } from "effector-react";
import { $chat,$inputHeight,setInputHeight } from "../../store/chat-store";
import { $socket } from "../../store/websocket/websocket-events";
import { forbiddenKeys } from "../../app-wide/constants";
import { MainText } from "../../UI/main-text";

export const MessageInput=() => {
    const {nickname}=useParams()
    const [draft,setDraft]=useState(()=>{
        if(!nickname)return ''
        return window.localStorage.getItem(nickname)||''
    })
    const [chatInputValue,setChatInputValue]=useState<string>('')
    const chatData=useUnit($chat)
    const socket=useUnit($socket)
    const inputDivRef=useRef<HTMLDivElement>(null)
    const inputHeight=useUnit($inputHeight)


    const keyDownHandler=(e:KeyboardEvent) => {
        if(forbiddenKeys.includes(e.key))return
        e.preventDefault()
        setDraft('')
        if(e.key==='Backspace'){
            setChatInputValue((prve)=>prve.slice(0,-1))
            return
        }
        setTimeout(()=>{
            if(inputDivRef.current?.scrollWidth&&inputDivRef.current?.scrollWidth>608){
                setChatInputValue((prev)=>prev.slice(0,-1)+'\n'+e.key)
                return
            }
        },0)
        setChatInputValue((prev)=>prev+e.key)
    }

    useEffect(()=>{
        if(!nickname)return
        setDraft(window.localStorage.getItem(nickname)||'')
    },[nickname])

    useEffect(()=>{
        if(!nickname||!chatInputValue||!inputDivRef.current)return
        const lines = (chatInputValue.match(/\n/g) || []).length;
        console.log(inputDivRef.current?.scrollHeight);
        setInputHeight(lines*24+35)
        window.localStorage.setItem(nickname,chatInputValue)
    },[nickname,chatInputValue])

    useEffect(()=>{
        setChatInputValue(draft)
        window.addEventListener('keydown',keyDownHandler)
        return ()=>window.removeEventListener('keydown',keyDownHandler)
    },[])


    return(
        <InputWrapper $margintop={`${inputDivRef.current?.scrollHeight&&inputDivRef.current.scrollHeight>346?inputDivRef.current.scrollHeight-346:'0'}px`}>
        <ChatInput $height={`${inputHeight}px`} ref={inputDivRef} >
            <MainText>
                {draft||chatInputValue?draft||chatInputValue:'Введите сообщение'}
            </MainText>
        </ChatInput>
        <SendButton 
        disabled={chatInputValue.length===0} 
        onClick={()=>{socket?.emit('send-message',{
                chat_id:chatData&&'messages' in chatData ? chatData.messages[0].chat_room_id:chatData?.chatId,
                message:chatInputValue}) 
            nickname&&window.localStorage.removeItem(nickname)
            setChatInputValue('')
            setInputHeight(35)
            }}
        setInput={setChatInputValue}

        />
        </InputWrapper>
    )
}