import { MainText } from "./main-text";
import { ReactNode } from "react";
import { Button } from "./submit-button";

interface SubmitButtonProps{
    children:ReactNode,
    onClick:()=>void
}

export const BackButton=({children,onClick}:SubmitButtonProps) => {
    return(
        <Button type="button" onClick={onClick}>
            <MainText $fontsize="17px" $color="white">{children}</MainText>
        </Button>
    )
}
