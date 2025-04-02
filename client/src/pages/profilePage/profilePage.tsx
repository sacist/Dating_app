import { SidePanel } from "../../modules"
import { Main } from "../../modules"
import { ProfilePageWrapper } from "../../UI/profile/page-wrapper"
import styled from "styled-components"
import { fetchProfilefx,updateOnlineStatus } from "../../store/profile-store"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { checkLoginFx } from "../../store/check-login-store"
import { $socket } from "../../store/websocket/websocket-events"
import { useUnit } from "effector-react"
export const ProfilePage=() => {
    const {nickname}=useParams()
    const socket=useUnit($socket)
    useEffect(()=>{
        if (nickname){
        fetchProfilefx(nickname)
        checkLoginFx()

        socket?.emit('join-profile',nickname)
        socket?.on('profile-host-online',()=>{
            updateOnlineStatus(true)
        })
        socket?.on('profile-host-offline',()=>{
            updateOnlineStatus(false)
        })
        return ()=>{
            socket?.emit('leave-profile',nickname)
        }
    }},[nickname,socket])
    return(
        <Background>
            <ProfilePageWrapper>
                <SidePanel/>
                <Main/>
            </ProfilePageWrapper>
        </Background>
    )
}

const Background=styled.div`
    background: linear-gradient(to right, #82b3e4, #4ca1af);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`