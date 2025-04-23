import styled from "styled-components";

export const MessagesWrapper=styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 100%;
    margin-left: 380px;
    gap: 2px;
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
`