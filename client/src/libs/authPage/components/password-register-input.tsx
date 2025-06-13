import { Input } from "../ui/input"
import { ErrorMessage } from "../ui/error-message"
import { useUnit } from "effector-react"
import { setPassword,$password,$passwordError } from "../store/register-store1"
import { InputErrorWrapper } from "../ui/input-error-wrapper";
import { ShowPasswordSvg } from "./show-password-svg";
import { useState } from "react";



export const PasswordRegisterInput=() => {
    const [passwordShown,setPasswordShown]=useState<boolean>(false)
    const passwordError=useUnit($passwordError)
    const password=useUnit($password)
    return(
        <InputErrorWrapper>
            <ShowPasswordSvg onClick={()=>{setPasswordShown(!passwordShown)}} showPassword={passwordShown}/>
            <Input 
            $type={passwordShown?'text':'password'}
            $onChange={(e)=>{setPassword(e.target.value)}}
            $value={password}
            $placeholder="Придумайте пароль"
            $filled={password.length>=8}
            $error={typeof passwordError==='string'}
            maxLength={30}
            />
            <ErrorMessage>{passwordError}</ErrorMessage>
        </InputErrorWrapper>
    )
}