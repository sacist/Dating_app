import styled from "styled-components";

export const ProfilePic=styled.img<{$cursorpointer?:boolean,$borderradius?:string,$width?:string,$height?:string}>`
    border-radius:50%;
    cursor: ${({$cursorpointer})=>$cursorpointer && 'pointer'};
    user-select: none;
    border-radius: ${({$borderradius})=>$borderradius};
    min-width: ${({ $width }) => $width || '60px'};
    min-height: ${({ $height }) => $height || '60px'};
    max-width: ${({ $width }) => $width || '60px'};
    max-height: ${({ $height }) => $height || '60px'};
    object-fit: cover;
`