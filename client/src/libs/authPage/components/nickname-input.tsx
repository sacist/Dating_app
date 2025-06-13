import { Input } from "../ui/input"
import { ErrorMessage } from "../ui/error-message"
import { $nickname,setNickname } from "../store/register-store2"
import { useUnit } from "effector-react"
import { InputErrorWrapper } from "../ui/input-error-wrapper"

interface NicknameRegisterprop{
    children:string|null
}

export const NicknameInput=({children}:NicknameRegisterprop) => {
    const nickname=useUnit($nickname)
    return(
        <InputErrorWrapper>
            <Input
            $error={typeof children==='string'}
            $value={nickname}
            $onChange={(e)=>{setNickname(e.target.value)}}
            $filled={nickname.length>=4}
            $placeholder="Придумайте никнейм от 4 символов"
            $type="text"
            maxLength={15}
            />
            <ErrorMessage>{children}</ErrorMessage>
        </InputErrorWrapper>
    )
}