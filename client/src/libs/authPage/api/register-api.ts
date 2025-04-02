import axios from "axios";
import baseURL from "../../../app-wide/constants";

export const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})

interface CheckEmailParams{
    email:string
}

interface RegisterParams{
    email:string
    password:string
    gender:string
    name:string
    nickname:string
}

interface Response{
    success:string
    error:string
}

export const checkEmail=async ({email}:CheckEmailParams):Promise<Response> => {
    const res=await axiosInstance.post(`/registration/check-email`,{email})
    return res.data
}

export const Register=async({email,password,gender,name,nickname}:RegisterParams):Promise<Response>=>{
    const res=await axiosInstance.post(`/registration/`,{email,password,gender,name,nickname})
    return res.data
}