import { StepOneRegistration,StepTwoRegistration } from "../modules";
import { Route, Routes } from "react-router-dom";

export const RegisterPage = () => {
    return (
            <Routes>
                <Route path="/step1" element={<StepOneRegistration/>} />
                <Route path="/step2" element={<StepTwoRegistration/>} />
            </Routes>
    )
}