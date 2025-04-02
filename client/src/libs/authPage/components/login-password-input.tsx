import { $password,setPassword,$passwordError } from "../store/login-store";
import { InputErrorWrapper } from "../ui/input-error-wrapper";
import { ShowPasswordSvg } from "./show-password-svg";
import { Input } from "../ui/input";
import { ErrorMessage } from "../ui/error-message";
import { useState } from "react";
import { useUnit } from "effector-react";
import React from "react";

export const LoginPasswordInput=React.memo(() => {
    const [showPassword,setShowPassword]=useState<boolean>(false)

    const password=useUnit($password)
    const passwordError=useUnit($passwordError)
    return(
        <InputErrorWrapper>
            <ShowPasswordSvg showPassword={showPassword} onClick={()=>setShowPassword(!showPassword)}/>
            <Input
            $type={showPassword?'text':'password'}
            $error={typeof passwordError==='string'}
            $filled={password.length>7}
            $placeholder="Введите ваш пароль"
            $value={password}
            $onChange={(e)=>{setPassword(e.target.value)}}
            />
            <ErrorMessage>{passwordError}</ErrorMessage>
        </InputErrorWrapper>
    )
})