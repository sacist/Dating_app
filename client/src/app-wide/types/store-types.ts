export interface ChangeProfileDataFx{
    nickname:string,
    dob:string|null,
    status:string,
    description:string
}

export interface IFetchChatFailData{
    error:string
    chatId:number
    online:boolean
    photo:string
    name:string
}