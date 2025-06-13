import { ButtonsStepTwo } from "./buttons-step2";
import { GenderButtonsWrapper } from "../ui/gender-butons-wrapper";
import  {GenderSelector}  from "./gender";


export const ButtonsGender=() => {
    return(
        <GenderButtonsWrapper>
            <GenderSelector/>
            <ButtonsStepTwo/>
        </GenderButtonsWrapper>
    )
}