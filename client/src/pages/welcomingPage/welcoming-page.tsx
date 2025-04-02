import styled from "styled-components"
import { Header } from "../../components/welcoming/header/header"
import { $socket } from "../../store/websocket/websocket-events"
import { useUnit } from "effector-react"
import { Socket } from "socket.io-client"
import { $isLoggedIn,checkLoginFx } from "../../store/check-login-store"
import { useEffect } from "react"
export const WelcomingPage=() => {
    const socket=useUnit($socket)
    const isLoggedIn=useUnit($isLoggedIn)

    useEffect(()=>{
        (async()=>{
            if(!isLoggedIn){
              try {
                await checkLoginFx()
              } catch (e) {
                console.log(e);
              }
            }
          })()
    },[])

    const joinM=(socket:Socket) => {
        socket.emit('join-matchmaking')
    }
    return(
    <Background>
        <Header/>
        <button onClick={()=>socket&&joinM(socket)}>Войти в мачмейкинг</button>
    </Background>
    )
}

const Background=styled.div`
    background: linear-gradient(to right, #2c3e50, #4ca1af);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`