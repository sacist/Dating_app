import styled from "styled-components";
import { MainText } from "../main-text";

export const ChatListWrapper=styled.ul`
    width: 340px;
    max-height: 100%;
    display: flex;
    flex-direction:column;
    padding: 0;
    margin-top: 55px;
    margin-bottom: 0;
    overflow-y: auto;
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
  flex-shrink: 0;
`

export const ChatWrapper=styled.li<{$currentchat:boolean}>`
    border-radius: 10px;    
    width: 96%;
    height: 75px;
    list-style-type: none;
    padding: 0;
    display: flex;  
    gap: 20px;
    margin-left: 5px;
    cursor: ${({$currentchat})=>!$currentchat&&'pointer'};
    background-color: ${({$currentchat})=>$currentchat&&'#3390ec'};
    &:hover{
        background-color: ${({$currentchat})=>!$currentchat&&'rgba(168, 168, 168, 0.45)'};
    }
    padding-left: 8px;
    flex-shrink: 0;
    align-items: center;
`
export const ColumnWrapper=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-top: 5px;
`
export const NameTimestampWrapper=styled.div`
    display: flex;
    justify-content:space-between;
    width:90%;
    align-items: center;
`
export const MessageText=styled(MainText)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;

`