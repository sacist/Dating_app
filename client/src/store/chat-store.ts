import { createStore, createEffect,sample } from "effector";
import { fetchChats } from "../modules/chat/api/fetch-chats";
import { IFetchChatsResponse } from "../modules/chat/api/fetch-chats";
import { IFetchChatResponse, fetchChat } from "../modules/chat/api/fetch-chat";
import { AxiosError } from "axios";

export const fetchChatsFx = createEffect(async () => {
    try {
        const res = await fetchChats()
        return res
    } catch (e) {
        if (e as AxiosError) {
            throw e
        }
    }
})

export const fetchChatFx = createEffect(async (nickname: string) => {
    try {
        const req = await fetchChat(nickname)
        return req
    } catch (e) {
        if (e as AxiosError) {
            throw e
        }
    }
})


export const $chats = createStore<IFetchChatsResponse | null>(null).on(fetchChatsFx.doneData, (_, val) => val)
export const $chat = createStore<IFetchChatResponse | null | string>(null)
    .on(fetchChatFx.doneData, (_, val) => val)
    .on(fetchChatFx.failData, (_, err) => {
        const axiosError = err as AxiosError<{ error: string }>
        return axiosError.response?.data.error || "Ошибка при получении чата"
    })

export const $currentChat = createStore<string | null>(null)


sample({
    clock:fetchChatFx.done,
    fn:({params})=>params,
    target:$currentChat
})
sample({
    clock:fetchChatFx.fail,
    fn:({params})=>params,
    target:$currentChat
})