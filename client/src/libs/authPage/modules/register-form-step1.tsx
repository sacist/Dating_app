import { PasswordRegisterInput } from "../components/password-register-input";
import { EmailRegisterInput } from "../components/email-register-input";
import { FormWrapper } from "../ui/form-wrapper";
import { SubmitButton } from "../ui/submit-button";
import { $password,$passwordError,$email,$emailError,setEmailError } from "../store/register-store1";
import { useUnit } from "effector-react";
import { FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../api/register-api";

export const RegisterFormStepOne=() => {
    const password=useUnit($password)
    const email=useUnit($email)
    const passwordError=useUnit($passwordError)
    const emailError=useUnit($emailError)
    const nav=useNavigate()

    const onSubmitHandler=async(e:FormEvent) => {
        e.preventDefault()
        const res=await checkEmail({email})
        if(!res.error){
            sessionStorage.setItem('proceed','true')
            nav('/register/step2')
        }else setEmailError(res.error)
    }

    return(
        <FormWrapper onSubmit={onSubmitHandler}>    
                <EmailRegisterInput onInvalid={()=>{setEmailError('Введите корректную почту')}}>{emailError}</EmailRegisterInput>
                <PasswordRegisterInput/>
            <SubmitButton
            $disabled={password.length<=7||typeof passwordError==='string'||typeof emailError==='string'}
            >Далее</SubmitButton>
        </FormWrapper>
    )
}

