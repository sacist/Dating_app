import { axiosInstance } from "../../../app-wide/constants";

export interface ProfileData{
    email:string
    name:string
    nickname:string
    dob:string|null
    gender:string
    status:string
    description:string
    online:boolean
}
interface FetchProfileResponse{
    profile:ProfileData
    myProfile:boolean
    photo:string
}

export const fetchProfile=async(nickname:string):Promise<FetchProfileResponse>=>{
    const res=await axiosInstance.get(`/profile/${nickname}`)
    return res.data
}