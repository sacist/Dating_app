import { MainText } from "./main-text";
import styled from "styled-components";
import { ChildrenOnClick } from "../../../app-wide/types/ui-types";

export const Link=({children,onClick}:ChildrenOnClick) => {
    return(
        <LinkWrapper onClick={onClick}>
            <MainText $fontsize="16px">{children}</MainText>
        </LinkWrapper>
    )
}

const LinkWrapper = styled.a`
    text-decoration: underline;
    margin-top: 40px;
    cursor: pointer;
    color:#0084ff;
    &:hover{
        color:#2c99ff; 
    }
  `