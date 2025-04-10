import { $socketInited,initSocketFx } from "../../store/websocket/websocket-events";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export const initWebsockets=() => {
    const socketInited=useUnit($socketInited)
    useEffect(()=>{ 
        if (socketInited) return
        initSocketFx()
      },[])
}