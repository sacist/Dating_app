import styled from "styled-components"

export const FetchedProfilePic=styled.img<{$editing?:boolean}>`
    width: 85px;
    height: 85px;
    border-radius: 50%;
    user-select: none;
    transition: opacity 0.3s ease;
    opacity: ${({$editing})=>$editing&&'0.85'}; 
    position: relative;
    z-index: 0;

`

export const ProfilePicAndChangeButton=styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    align-items: center;
`
export const NameStatus=styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`
export const PicFlexWrapper=styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`