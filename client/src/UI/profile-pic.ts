import styled from "styled-components";

export const ProfilePic=styled.img<{$cursorpointer?:boolean,$borderradius?:string,$width?:string,$height?:string}>`
    border-radius:50%;
    width:60px;
    height:60px;
    cursor: ${({$cursorpointer})=>$cursorpointer && 'pointer'};
    user-select: none;
    border-radius: ${({$borderradius})=>$borderradius};
    height: ${({$height})=>$height};
    width: ${({$width})=>$width};
`