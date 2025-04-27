import { axiosInstance } from "../../../app-wide/constants";

export interface IMessage{
    id:number
    chat_room_id:number
    user_id:number
    message:string
    timestamp:string
    myMessage:boolean
}

export interface IFetchChatResponse{
    messages:IMessage[]
}

export const fetchChat=async (nickname:string,signal?:AbortSignal):Promise<IFetchChatResponse> => {
    const res=await axiosInstance.get(`/chat/get-chat/${nickname}`,{
        signal
    })
    return res.data
}