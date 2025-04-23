import { createStore, createEvent, sample, createEffect } from "effector";
import { changeProfileDataFx } from "./profile-change-data";
import { AxiosError } from "axios";
import { fetchChatFx,fetchChatsFx } from "./chat-store";

let notificationTimeout:number



const resetBackgroundFx=createEffect(()=>{
    setTimeout(()=>{
        resetBackground()
    },1000)
})

const resetBackground=createEvent()
export const setNotification = createEvent<string>();
export const resetNotification = createEvent();
export const setNotificationError=createEvent<boolean>()
export const setBackground=createEvent<string>()


export const $background=createStore<string|null>(null).on(setBackground,(_,val)=>val).reset(resetBackground)
export const $notification = createStore<string>("")
.on(setNotification, (_, val) => {
    clearTimeout(notificationTimeout);
    return val;
})
.reset(resetNotification);


const clearNotificationFx = createEffect(() => {
    return new Promise<void>((resolve)=>{
        notificationTimeout = setTimeout(() => {
            resetNotification();
            resolve()
        }, 10000);
    })
});



$notification.on(changeProfileDataFx.failData,(_,err)=>{
    const axiosError=err as AxiosError
        switch (axiosError.response?.status) {
            case 404:
                return "Ошибка профиля" 
            case 409:
                return "Никнейм занят"
            case 500:
                return "Ошибка на сервере"
            default:
                return err.message || "Неизвестная ошибка"
    }
})
$notification.on(fetchChatsFx.failData,(_,err)=>{
    const axiosError=err as AxiosError
    if(axiosError.response?.status===500) return 'Ошибка при загрузке чатов'
})
$notification.on(fetchChatFx.failData,(_,err)=>{
    const axiosError=err as AxiosError
    if(axiosError.response?.status===500) return 'Ошибка при загрузке чата'
})

$notification.on(changeProfileDataFx.doneData,(_,__)=>"Профиль обновлён")

sample({
    clock: changeProfileDataFx.failData,
    fn: () => 'rgba(255, 77, 77, 0.9)',
    target: $background,
});

sample({
    clock: $notification,
    target: clearNotificationFx,
});

sample({
    clock:clearNotificationFx.done,
    target:resetBackgroundFx
})