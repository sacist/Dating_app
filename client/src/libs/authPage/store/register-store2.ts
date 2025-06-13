import { createStore,createEvent} from "effector";


const nicknameRegex=/^[\p{L}0-9]*$/u
const nameRegex=/^[\p{L}0-9-]*$/u


export const setNickname=createEvent<string>()
export const setName=createEvent<string>()
export const setGender=createEvent<string>()
export const setNicknameError=createEvent<string>()

export const $nickname=createStore<string>('').on(setNickname,(state,val)=>{
    if(!nicknameRegex.test(val)){
        return state
    }
    return val
})
export const $name=createStore<string>('').on(setName,(state,val)=>{
    if(!nameRegex.test(val) || val==='-' ){
        return state
    }
    return val
})
export const $gender=createStore<string>('М').on(setGender,(_,val)=>val)
export const $nicknameError=createStore<string|null>(null).on(setNicknameError,(_,val)=>val).reset(setNickname)