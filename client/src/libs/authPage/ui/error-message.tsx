import styled from "styled-components";
import { MainText } from "./main-text";
import { ReactChildProps } from "../../../app-wide/types/ui-types";



export const ErrorMessage=({children}:ReactChildProps) => {
    return(
        <ErrorMessageWrapper>
            <MainText $color="red" $fontsize="14px" >{children}</MainText>
        </ErrorMessageWrapper>
    )
}



const ErrorMessageWrapper = styled.div`
    padding-bottom: 20px;
`;