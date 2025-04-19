import { createStore, createEvent, sample, createEffect } from "effector";
import { changeProfileDataFx } from "./profile-change-data";
import { AxiosError } from "axios";

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
    if (err instanceof AxiosError) {
        if (err.response?.status === 404) return "Ошибка профиля";
        if (err.response?.status === 409) return "Никнейм занят";
        if (err.response?.status === 500) return "Ошибка на сервере";
    }
    return err.message || "Неизвестная ошибка";
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