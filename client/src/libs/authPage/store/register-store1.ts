import { createStore,createEvent,sample} from "effector";


export const regex = /^[A-Za-z0-9!@#$%^&*._-]*$/
const specRegex = /[^a-zA-Z0-9]/
const capitalRegex=/(?=.*[A-Z])/

const validatePassword=(password:string):string|null=>{
    if(password.length<=7) return 'Пароль должен содержать как минимум 8 символов'
    if(!capitalRegex.test(password)) return 'Пароль должен содержать хотя бы одну заглавную букву'
    if(!specRegex.test(password)) return 'Пароль должен содержать как минимум 1 специальный символ'
    return null
}



export const setPassword=createEvent<string>()
export const setEmail=createEvent<string>()
export const setEmailError=createEvent<string>()


export const $password=createStore<string>('').on(setPassword,(state,val)=>{
    if (!regex.test(val)) {
        return state
    }
    return val
})
export const $passwordError=createStore<string|null>(null)
export const $emailError=createStore<string|null>(null)
.on(setEmailError,(_,val)=>val)
export const $email=createStore<string>('').on(setEmail,(state,val)=>{
    if (!regex.test(val)) {
        return state
    }
    return val
})

$passwordError.reset(setPassword)
$emailError.reset(setEmail)


sample({
    clock:setPassword,
    source:$password,
    fn:validatePassword,
    target:$passwordError
})

