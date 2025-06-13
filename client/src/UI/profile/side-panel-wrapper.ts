import styled from "styled-components";

export const SidePanelWrapper=styled.aside`
    display: flex;
    flex-direction: column;
    width: 75px;
    height: 100%;
    background-color: white;
    justify-content: center;
`

export const SidePanelItem=styled.div`
    display:flex ;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color:rgba(74, 131, 236, 0.21);
    }
    padding: 5px 0;
`