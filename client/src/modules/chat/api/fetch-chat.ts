import { axiosInstance } from "../../../app-wide/constants";

interface Ichat{
    id:number
    chat_room_id:number
    user_id:number
    message:string
    timestamp:string
    myMessage:boolean
}

export interface IFetchChatResponse{
    messages:Ichat[]
}

export const fetchChat=async (nickname:string):Promise<IFetchChatResponse> => {
    const res=await axiosInstance.get(`/chat/get-chat/${nickname}`)
    return res.data
}