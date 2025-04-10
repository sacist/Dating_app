import { useEffect } from "react"
import { useUnit } from "effector-react"
import { $isLoggedIn,checkLoginFx } from "../../store/check-login-store"

export const useCheckLogin=() => {
    const isLoggedIn=useUnit($isLoggedIn)
    
        useEffect(()=>{
            (async()=>{
                if(!isLoggedIn){
                  try {
                    await checkLoginFx()
                  } catch (e) {
                  }
                }
              })()
        },[])
}