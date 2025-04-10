import { Header } from "../../components/welcoming/header/header"
import { $socket } from "../../store/websocket/websocket-events"
import { useUnit } from "effector-react"
import { Socket } from "socket.io-client"
import { Background } from "../../UI/welcoming/welcoming-main"
export const WelcomingPage=() => {
    const socket=useUnit($socket)

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