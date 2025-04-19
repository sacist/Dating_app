import styled from "styled-components";
import '@fontsource/rubik'

export const ChangeProfileButton = styled.button`
    background-color: rgb(36,160,237);
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    width: 90px;
    height: 40px;
    &:hover{
        background-color:  rgb(36, 143, 209);
    }
    color: white;
    font-size: 15px;
`

export const UploadPhotoButton=styled.button`
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    color: white;
    &:hover {
        color: #0f0f0f; 
    }
    transition: 0.3s ease;
    z-index: 1;
`
export const PhotoWrapper=styled.div`
    position: relative;
`
export const HiddenInput=styled.input`
    display:none;
`

export const AgeChangeInput=styled.input<{$filled?:boolean,$error?:boolean}>`
    width: 50px;
    height: 25px;
    border-radius: 3px;
    &:focus{
        border: 2px solid #00acc1;
        background-color: #e0f7fa;
        &::placeholder{
            color:rgba(0, 0, 0, 0.74);
        }
    }
    border: ${({ $filled, $error }) => 
            $error ? '2px solid #c42700' : ($filled ? '2px solid #00acc1' : '2px solid #ccc')};
    background-color: ${({ $filled, $error }) => 
            $error ? '#fddcdc' : ($filled ? '#e0f7fa' : 'transparent')};
    font-size: 16px;
    transition: background-color 0.3s, border-color 0.3s;
    outline: none;
    
`

export const AgeChangeContainer=styled.div`
    display: flex;
    gap: 8px;
    margin-left: -30px;
`

export const AgeChangeMonthSelect=styled.select`
    border: 2px solid #00acc1;
    outline: none;
    border-radius: 3px;
`
export const NicknameChangeInput=styled(AgeChangeInput)<{$nicknameerror?:boolean}>`
    width: 170px;
    height: 25px;
    margin-left: -30px;
    font-size: 18px;
    &:focus{
        border: ${({ $filled, $error }) => 
            $error ? '2px solid #c42700' : ($filled && '2px solid #00acc1')};
    background-color: ${({ $filled, $error }) => 
            $error ? '#fddcdc' : ($filled && '#e0f7fa')};
    }
    ${({ $nicknameerror }) => $nicknameerror && `
        animation: shake 0.3s ease-in-out;
    `}

    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
`

export const StatusChangeInput=styled.textarea<{$filled?:boolean,$error?:boolean}>`
    width: 208px;
    margin-left: -30px;
    height: 80px;
    font-family: 'Rubik';
    outline: none;
    border: ${({ $filled, $error }) => 
            $error ? '2px solid #c42700' : ($filled ? '2px solid #00acc1' : '2px solid #ccc')};
    background-color: ${({ $filled, $error }) => 
            $error ? '#fddcdc' : ($filled ? '#e0f7fa' : 'transparent')};
    &:focus{
        border: ${({ $filled, $error }) => 
            $error ? '2px solid #c42700' : ($filled && '2px solid #00acc1')};
    background-color: ${({ $filled, $error }) => 
            $error ? '#fddcdc' : ($filled && '#e0f7fa')};
    }
    font-size: 18px;
    resize: none;
    border-radius: 4px;
`
export const StatusContainer=styled.div`
    max-width: 200px;
    word-break: break-word;
`
export const FlexContainer=styled.div`
    display: flex;
    width: 100%;
    gap: 300px;
`
export const DescriptionContainer=styled(StatusContainer)`
    max-width: 400px;
    max-height: 215px;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    &:hover{
      background-color: rgba(0, 0, 0, 0.4);
    }
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`
export const DescriptionChangeInput=styled(StatusChangeInput)`
    width:400px;
    height: 150px;
`