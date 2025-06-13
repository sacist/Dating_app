import { $loginData,setLoginData,$loginDataError } from "../store/login-store";
import { useUnit } from "effector-react";
import { InputErrorWrapper } from "../ui/input-error-wrapper";
import { Input } from "../ui/input";
import { ErrorMessage } from "../ui/error-message";
import React from "react";


export const LoginDataInput=React.memo(() => {
    const loginData=useUnit($loginData)
    const logingDataError=useUnit($loginDataError)
    return(
        <InputErrorWrapper>
            <Input
            $error={typeof logingDataError==='string'}
            $filled={loginData.length>3}
            $placeholder="Введите почту или никнейм"
            $type="text"
            $value={loginData}
            $onChange={(e)=>{setLoginData(e.target.value)}}
            />
            <ErrorMessage>{logingDataError}</ErrorMessage>
        </InputErrorWrapper>
    )
})