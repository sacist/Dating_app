import { createStore, createEffect,sample,createEvent } from "effector";
import { fetchChats } from "../modules/chat/api/fetch-chats";
import { IFetchChatsResponse } from "../modules/chat/api/fetch-chats";
import { IFetchChatResponse, IMessage, fetchChat } from "../modules/chat/api/fetch-chat";
import { isAxiosError } from "axios";
import { IFetchChatFailData } from "../app-wide/types/store-types";

export const fetchChatsFx = createEffect(async () => {
    try {
        const res = await fetchChats()
        return res
    } catch (e) {
        if (isAxiosError(e)) {
            throw e
        }
    }
})

export const fetchChatFx = createEffect(async ({ nickname, signal }: { nickname: string; signal: AbortSignal }) => {
    try {
        const req = await fetchChat(nickname,signal)
        return req
    } catch (e) {
        if (isAxiosError(e)) {
            throw e
        }
    }
})

export const addNewMessage=createEvent<IMessage>()
export const setInputHeight=createEvent<number>()
export const setMarginHelper=createEvent<number>()

export const $chats = createStore<IFetchChatsResponse | null>(null).on(fetchChatsFx.doneData, (_, val) => val)
export const $chat = createStore<IFetchChatResponse | null | IFetchChatFailData>(null)
    .on(fetchChatFx.doneData, (_, val) => val)
    .on(fetchChatFx.failData, (_, err) => {
        if(!isAxiosError(err)) return null
        return err.response?.data || "Ошибка при получении чата"
    })

export const $currentChat = createStore<string | null>(null)
export const $inputHeight=  createStore<number>(35).on(setInputHeight,(_,val)=>val)
export const $marginHelper=createStore<number>(0).on(setMarginHelper,(_,val)=>val)

$chat.on(addNewMessage,(prev,newMessage)=>{
    if(!prev)return prev
    if(!('messages' in prev)){
        return {
            messages:[newMessage]
        }
    }
  return {
    ...prev,
    messages: [...prev.messages, newMessage],
  }
})
sample({
    clock:fetchChatFx.done,
    fn:({params})=>params.nickname,
    target:$currentChat
})
sample({
    clock:fetchChatFx.fail,
    fn:({params})=>params.nickname,
    target:$currentChat
})
sample({
    clock:addNewMessage,
    target:fetchChatsFx
})