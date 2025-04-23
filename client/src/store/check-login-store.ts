import { createStore,createEffect } from "effector";
import { checkLogin } from "../app-wide/api/check-login";
import  baseURL  from "../app-wide/constants";

export const checkLoginFx=createEffect(async()=>{
    const req=await checkLogin()
    return req
})


export const $isLoggedIn=createStore<boolean|null>(null).on(checkLoginFx.doneData,(_,val)=>{
    if(val.data.success) return true
}).on(checkLoginFx.failData,(_,__)=>false)


export const $nickname=createStore<string|null>(null,{ skipVoid: false }).on(checkLoginFx.doneData,(_,val)=>val.data.nickname)


export const $profilePhotoLink=createStore<string|null>(null).on(checkLoginFx.doneData,(_,val)=>baseURL+val.data.link)

