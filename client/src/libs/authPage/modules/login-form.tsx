import { FormWrapper } from "../ui/form-wrapper";
import { LoginDataInput } from "../components/login-data-input";
import { LoginPasswordInput } from "../components/login-password-input";
import { SubmitButton } from "../ui/submit-button";
import { $loginDataError,$passwordError,$password,$loginData,setLoginDataError,setPasswordError } from "../store/login-store";
import { useUnit } from "effector-react";
import { login } from "../api/login-api";
import { useNavigate } from "react-router-dom";
import React from "react";



export const LoginForm=React.memo(() => {
    const loginDataError=useUnit($loginDataError)
    const passwordError=useUnit($passwordError)
    const password=useUnit($password)
    const loginData=useUnit($loginData)
    const nav=useNavigate()
    const onSubmitHandler=async(e:React.FormEvent) => {
        e.preventDefault()
        try {
            const res=await login({loginData,password})
            if(res.loginDataError)setLoginDataError(res.loginDataError)
            if(res.passwordError)setPasswordError(res.passwordError)
            if(res.success)nav('/')
        } catch (e) {
            console.log(e);        
        }
    }
    return(
        <FormWrapper onSubmit={onSubmitHandler}>
            <LoginDataInput/>
            <LoginPasswordInput/>
            <SubmitButton $disabled={typeof (loginDataError||passwordError)==='string'}>Войти</SubmitButton>
        </FormWrapper>
    )
})