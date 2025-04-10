import styled from "styled-components";

export const Background=styled.div`
    background: linear-gradient(to right, #82b3e4, #4ca1af);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`


export const MainHeader=styled.header`
    display:flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
`


export const MainContent=styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 30px;
    width: 100%;
`

export const ProfileData=styled.div`
    width: 100%;
    height: 83%;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const DecorativeGradient=styled.div`
    height: 90px;
    width: 100%;
    background: linear-gradient(to right,rgb(156, 205, 255), #4ca1af);
    border-radius:4px;
    border-radius:4px 4px 1px 1px;
`

export const RestOfContent=styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
`
export const RestOfContentItem=styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-self: start;
    margin-left: 60px;
    margin-top: 30px;
`

