import { createStore,createEvent } from "effector";
import { regex } from "./register-store1";


export const setLoginData=createEvent<string>()
export const setLoginDataError=createEvent<string>()
export const setPassword=createEvent<string>()
export const setPasswordError=createEvent<string>()

export const $loginData=createStore<string>('').on(setLoginData,(_,val)=>val)
export const $loginDataError=createStore<string|null>(null).on(setLoginDataError,(_,val)=>val).reset(setLoginData)
export const $password=createStore<string>('').on(setPassword,(state,val)=>{
    if (!regex.test(val)) {
        return state
    }
    return val
})
export const $passwordError=createStore<string|null>(null).on(setPasswordError,(_,val)=>val).reset(setPassword)