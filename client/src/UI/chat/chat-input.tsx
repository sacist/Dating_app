import {Dispatch, SetStateAction, useEffect,useRef} from "react";
import styled from "styled-components";
import { MainText } from "../main-text";
export const InputWrapper=styled.div<{$margintop:string}>`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 35px;
    margin-left: 58px;
    padding-top: 5px;
    margin-top: ${({$margintop})=>$margintop};
`

export const ChatInput = styled.div<{$height?:string,$marginbottom?:string}>`
    width: 604px;
    height: ${({$height})=>$height};
    outline: none;
    border-radius: 5px;
    background-color: white;
    padding: 5px;
    font-size: 20px;
    border: solid 1px black;
    &::placeholder{
        color: rgb(173, 173, 173);
    }
    display: flex;
    align-items: flex-start;
    max-height: 300px;
    flex-shrink: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    &:hover{
      background-color: rgba(0, 0, 0, 0.4);
    }
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`

export const SendButton = ({onClick,disabled,setInput}:{onClick:()=>void,disabled:boolean,setInput:Dispatch<SetStateAction<string>>}) => {
    const buttonRef=useRef<HTMLButtonElement>(null)
    const keyDownHandler=(e:KeyboardEvent) => {
        if(e.key!=='Enter')return
        if(e.shiftKey){
            e.preventDefault()
            setInput((prev)=>prev+'\n')
            return
        }
        e.preventDefault()
        buttonRef.current?.click()
    }
    useEffect(()=>{
        window.addEventListener('keydown',keyDownHandler)
        return()=>{window.removeEventListener('keydown',keyDownHandler)}
    },[])
    return (
        <Button onClick={onClick} disabled={disabled} ref={buttonRef}>
            <Icon>
                <circle cx="24" cy="24" r="23" fill="#3B82F6" fillOpacity="0.2" />
                <circle cx="24" cy="23" r="23" fill="url(#gradient-blue)" />
                <defs>
                    <linearGradient id="gradient-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                </defs>
                <path d="M18 24H30M30 24L24 18M30 24L24 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16C16 16 18 12 24 12C30 12 32 16 32 16" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </Icon>
        </Button>
    )
}

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    filter: grayscale(100%);
    cursor: default;
  }
  transition: all 0.4s ease;
  align-self: flex-end;
  `

const Icon = styled.svg`
  width: 48px;
  height: 48px;
  transition: filter 0.3s ease, opacity 0.3s ease;

  ${Button}:not(:disabled):hover & {
    filter: brightness(1.2);
  }
  margin-top: 3px;
`;

export const Text=styled(MainText)`
    max-height:100px;
`