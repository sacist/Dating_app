import styled from "styled-components"
import { ChildrenOnClick } from "../../app-wide/types/ui-types";
import { MainText } from "../main-text";



export const Button = ({ children,onClick }:ChildrenOnClick) => {
    return (
        <ButtonElement onClick={onClick}>
            <MainText $fontsize="22px" $nouserselect $color="#0c0c0c">{children}</MainText>
        </ButtonElement>
    )
}

const ButtonElement = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 22px;
    height: 100%;
    padding: 20px;
    cursor: pointer;
    &:hover{
        background: linear-gradient(to right, #ff5f6d, #ffc371);
    };
    background-color: #ffffffd5;
`