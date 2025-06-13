import { SubmitButton } from "../ui/submit-button"
import { StepTwoButtonsWrapper } from "../ui/step2-butons-wrapper"
import { BackButton } from "../ui/back-button"
import { useUnit } from "effector-react"
import { $nickname,$name } from "../store/register-store2"
import { useNavigate } from "react-router-dom"

export const ButtonsStepTwo=() => {
    const name=useUnit($name)
    const nickname=useUnit($nickname)
    const nav=useNavigate()
    return(
        <StepTwoButtonsWrapper>
            <BackButton onClick={()=>{nav('/register/step1')}}>назад</BackButton>
            <SubmitButton $disabled={name.length<1||nickname.length<=3}>далее</SubmitButton>
        </StepTwoButtonsWrapper>
    )
}