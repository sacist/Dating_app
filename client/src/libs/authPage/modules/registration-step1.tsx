import { AuthLayout } from "./auth-layout";
import { RegisterFormStepOne } from "./register-form-step1";


export const StepOneRegistration = () => {
    return (
        <AuthLayout register>
            <RegisterFormStepOne />
        </AuthLayout>
    )
}