import { FormWrapper } from "../ui/form-wrapper"
import { Input } from "../ui/input"
import { $email,$password } from "../store/register-store1"
import { $name,setName,$gender,$nickname,$nicknameError,setNicknameError } from "../store/register-store2"
import { useUnit } from "effector-react"
import { InputErrorWrapper } from "../ui/input-error-wrapper"
import { NicknameInput } from "../components/nickname-input"
import { ButtonsGender } from "../components/buttons-gender"
import {useEffect } from "react"
import { Register } from "../api/register-api"
import { useNavigate } from "react-router-dom"

export const RegisterFormStepTwo=() => {
    const name=useUnit($name)
    const nickname=useUnit($nickname)
    const email=useUnit($email)
    const password=useUnit($password)
    const gender=useUnit($gender)
    const nicknameError=useUnit($nicknameError)
    const nav=useNavigate()
    const onSubmitHandler=async(e:React.FormEvent) => {
        e.preventDefault()
        const res=await Register({email,password,gender,name,nickname})
        if(res.error){
            setNicknameError(res.error)
        }else if(res.success){
            nav('/')
        }
    }

    useEffect(()=>{
        if(!sessionStorage.getItem('proceed')||!email||!password){
            nav('/register/step1')
        }
    },[])
    return(
        <FormWrapper onSubmit={onSubmitHandler}>
            <InputErrorWrapper>   
                <Input
                $placeholder="Введите ваше имя"
                $onChange={(e)=>{setName(e.target.value)}}
                $value={name}
                $error={false}
                $filled={name.length>0}
                $type="text"
                maxLength={15}
                />
            </InputErrorWrapper>
            <NicknameInput>{nicknameError}</NicknameInput>
            <ButtonsGender/>
        </FormWrapper>
    )
}