import { createStore, createEvent, sample, createEffect } from "effector";
import { changeProfileDataFx } from "./profile-change-data";
import { errorMessages } from "../app-wide/constants";
import { AxiosError } from "axios";

let notificationTimeout:number

const clearNotificationFx = createEffect(() => {
    notificationTimeout = setTimeout(() => {
        resetNotification();
    }, 10000);
});

export const setNotification = createEvent<string>();
export const resetNotification = createEvent();

export const $notification = createStore<string>("")
    .on(setNotification, (_, val) => {
        clearTimeout(notificationTimeout);
        return val;
    })
    .reset(resetNotification);

export const $notificationError = createStore<boolean>(false);

sample({
    clock: changeProfileDataFx.failData,
    fn: (err) => {
        if (err instanceof AxiosError) {
            if (err.response?.status === 404) return "Ошибка профиля";
            if (err.response?.status === 409) return "Никнейм занят";
            if (err.response?.status === 500) return "Ошибка на сервере";
        }
        return err.message || "Неизвестная ошибка";
    },
    target: setNotification,
});

sample({
    clock: changeProfileDataFx.doneData,
    fn: () => "Профиль обновлён",
    target: setNotification,
});

sample({
    clock: setNotification,
    fn: (val) => errorMessages.includes(val),
    target: $notificationError,
});

sample({
    clock: setNotification,
    target: clearNotificationFx,
});
