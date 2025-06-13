import { Input } from "../ui/input";
import { ErrorMessage } from "../ui/error-message";
import { $email } from "../store/register-store1";
import { setEmail } from "../store/register-store1";
import { useUnit } from "effector-react";
import { InputErrorWrapper } from "../ui/input-error-wrapper";

interface EmailRegisterprop{
    children:string|null
    onInvalid:()=>void
}

export const EmailRegisterInput=({children,onInvalid}:EmailRegisterprop) => {
    const email=useUnit($email)
    return(
        <InputErrorWrapper> 
            <Input
            $placeholder="Введите почту"
            $type="email"
            $value={email}
            $onChange={(e)=>{
                setEmail(e.target.value)
            }}
            $filled={email.includes('@')}
            $error={typeof children === 'string'}
            onInvalid={onInvalid}
            maxLength={37}
            />
            <ErrorMessage>{children}</ErrorMessage>
        </InputErrorWrapper>
    )
}
