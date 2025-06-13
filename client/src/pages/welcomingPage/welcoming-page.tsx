import { useEffect } from "react"
import { Header } from "../../components/welcoming/header/header"
import { Background } from "../../UI/welcoming/welcoming-main"
import { checkLoginFx } from "../../store/check-login-store"
export const WelcomingPage=() => {
    useEffect(()=>{
        checkLoginFx()
    },[])
    return(
    <Background>
        <Header/>
    </Background>
    )
}