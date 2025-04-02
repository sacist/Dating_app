import { Router } from "./router";
import { initSocketFx,$socket,$socketInited } from "./store/websocket/websocket-events";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { $nickname } from "./store/check-login-store";
import { AppWideModules } from "./modules";

export const App = () => {
  const socketInited=useUnit($socketInited)
  const socket=useUnit($socket)
  const nickname=useUnit($nickname)

  useEffect(()=>{
    if (!socketInited) {
      initSocketFx()
    }
    if (socket&&nickname) {
      socket.emit('become-online',nickname)
    }
  },[socket,nickname])
  return (
    <>   
    <AppWideModules/>
    <Router />
    </>
  )
}