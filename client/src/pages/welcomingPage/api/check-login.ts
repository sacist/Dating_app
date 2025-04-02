import axios from "axios";
import { AxiosResponse } from 'axios'
import baseURL from "../../../app-wide/constants";

const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})

interface CheckLoginResponse{
    success:boolean
    link:string
    nickname:string
}

export const checkLogin=async():Promise<AxiosResponse<CheckLoginResponse>>=>{
    const res=await axiosInstance.get('/login/check')
    return res
    
}
