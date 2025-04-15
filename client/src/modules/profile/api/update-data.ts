import { axiosInstance } from "./fetch-profile";


export const updateProfile=async(nickname:string,dob:string|null,status:string|null,description:string|null)=>{
    const res=await axiosInstance.post('/profile/update-data',{nickname,status,description,dob})
    return res
}