import { axiosInstance } from "../../../app-wide/constants";

interface FoundUser{
    nickname:string
}

export interface FindByNicknameResponse{
    foundUsers: FoundUser[],
    error:string
}

export const findByNickname=async(nickname:string,signal:AbortSignal):Promise<FindByNicknameResponse> => {
    const res=await axiosInstance.get(`/profile/find/${nickname}`,{signal})
    return res.data
}