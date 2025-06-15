import styled from "styled-components";

export const CopilotWrapper=styled.aside<{$haveactivechat:boolean}>`
    width: 290px;
    height: 100%;
    border-left: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self:right;
    margin-left: ${({$haveactivechat})=>$haveactivechat?'none':'1289px'};
    flex-shrink: 0;
`

export const Header=styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    gap: 15px;
    justify-content: center;
`