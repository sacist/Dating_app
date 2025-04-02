import { axiosInstance } from "./register-api";


interface Login{
    loginData:string
    password:string
}

interface LoginResponse{
    loginDataError:string
    passwordError:string
    success:string
    serverError:string
}

export const login=async({loginData,password}:Login):Promise<LoginResponse> => {
    const res=await axiosInstance.post('/login',{loginData,password})
    return res.data
}