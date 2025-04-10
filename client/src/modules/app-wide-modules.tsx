import { Notification } from "./notification/notification"
import { initWebsockets } from "./app wide websocket/websocket-init"
import { becomeOnline } from "./app wide websocket/become-online"
import { useCheckLogin } from "../app-wide/hooks/check-login-welcoming"
export const AppWideModules=() => {
    initWebsockets()
    useCheckLogin()
    becomeOnline()
    return(
        <Notification/>
    )
}