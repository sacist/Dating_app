import { AxiosResponse } from 'axios'
import { axiosInstance } from "../constants";

interface CheckLoginResponse{
    success:boolean
    link:string
    nickname:string
}

export const checkLogin=async():Promise<AxiosResponse<CheckLoginResponse>>=>{
    const res=await axiosInstance.get('/login/check')
    return res
}
