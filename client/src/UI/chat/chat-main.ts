import styled from "styled-components";

export const MessagesWrapper=styled.div<{$inputheight:number}>`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: calc(100% - ${({ $inputheight }) => $inputheight}px);
    gap: 2px;
    max-height: 780px;
    overflow-y: scroll;
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
export const Message=styled.div<{$myMessage:boolean,$firstinseq?:boolean,$lastinseq?:boolean}>`
    background-color: ${({$myMessage})=>$myMessage?'#67aef5':'rgba(168, 168, 168, 0.45)'};
    max-width: 300px;
    padding: 10px;
    min-height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: ${({$myMessage})=>$myMessage?'end':'start'};
    border-radius: ${({$myMessage})=>$myMessage?'15px 3px 3px 15px':'3px 15px 15px 3px'};
    border-radius:${({$lastinseq,$firstinseq})=>$firstinseq?'15px 15px 15px 3px':$lastinseq&&'8px 15px 15px 0.5px'};
    word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  flex-shrink: 0;
  margin: ${({$myMessage})=>$myMessage?'0 230px 0 0':'0 0 0 230px'};
`
export const ChatWrapper=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-height: calc(100vh - 61px);

`