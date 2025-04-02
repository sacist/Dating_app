import { AuthLayout } from "./auth-layout"
import { RegisterFormStepTwo } from "./register-form-step2"


export const StepTwoRegistration=() => {
    return(
        <AuthLayout register>
            <RegisterFormStepTwo/>
        </AuthLayout>
    )
}