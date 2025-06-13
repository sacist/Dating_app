import styled from "styled-components";

export const ChatHeader=styled.header`
position: relative;
    width: 100%;
    border-bottom: 1px solid black;
    height: 75px;
    display: flex;
    z-index: 0;
`
export const DialogueHeaderWrapper=styled.div`
    width: 100%;
    display: flex;
    margin-left: 50px;
    align-items: center;
`
export const InfoWrapper=styled.div`
    display: flex;
    gap: 25px;
`
export const NameOnlineWrapper=styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 2px;
`
export const CompMessageWrapper=styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 300px;
    height: 100%;
    width: 400px;
    align-items: center;
    gap: 30px;
`