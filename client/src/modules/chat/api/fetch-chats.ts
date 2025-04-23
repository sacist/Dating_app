import { axiosInstance } from '../../../app-wide/constants'
import { messageItem } from '../../../app-wide/types/types'



interface ILastMessage{
    message:messageItem[]
    timestamp:messageItem[]
}

export interface IFetchChatsResponse{
    chatsPhotos:string[]
    names:string[]
    lastMessages:ILastMessage
    ids:number[]
    nicknames:string[]
}

export const fetchChats=async():Promise<IFetchChatsResponse>=>{
    const res=await axiosInstance.get('/chat/get-chats')
    return res.data
}