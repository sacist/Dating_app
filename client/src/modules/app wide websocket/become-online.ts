import { $socket } from "../../store/websocket/websocket-events";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { $nickname } from "../../store/check-login-store";

export const becomeOnline=() => {
    const socket=useUnit($socket)
    const nickname=useUnit($nickname)
    useEffect(()=>{
        if(socket && nickname){
            socket.emit('become-online',nickname)
        }
    },[socket,nickname])
}