import styled from "styled-components";
import { MainText } from "./main-text";
import { ReactNode } from "react";

interface SubmitButtonProps{
    children:ReactNode
    $disabled:boolean
}

export const SubmitButton=({children,$disabled}:SubmitButtonProps) => {
    return(
        <Button type="submit" disabled={$disabled}>
            <MainText $fontsize="17px" $color="white">{children}</MainText>
        </Button>
    )
}




export const Button = styled.button`
    background-color:#00acc1 ;
    min-height: 40px;
    width: 100px;
    border-radius: 10px;
    border: none;
    align-self: flex-end;
    &:disabled{
        cursor: default;
        background-color:#ccc;
    }
    cursor: pointer;
    &:not(:disabled):hover{
        background-color:#0096aa ;
    }
`;