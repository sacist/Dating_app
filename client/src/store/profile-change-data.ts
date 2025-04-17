import { createStore, createEvent, sample, createEffect } from "effector";
import { $profileData, fetchProfilefx } from "./profile-store";
import { updateProfile } from "../modules/profile/api/update-data";
import { AxiosError } from "axios";
import { ChangeProfileDataFx } from "../app-wide/types/store-types";

export const changeProfileDataFx = createEffect(async ({ nickname, dob, status, description }: ChangeProfileDataFx) => {
    if (nickname.length < 4) {
        throw new Error("Никнейм должен содержать минимум 4 символа");
    }
    try {
        const req = await updateProfile(nickname, dob, status, description);
        return req.data;
    } catch (e) {
        if (e as AxiosError) {
            throw e;
        }
        throw new Error("Неизвестная ошибка");
    }
});

export const setAgeDate = createEvent<string>();
export const setAgeYear = createEvent<string>();
export const setAgeMonth = createEvent<string>();
export const setNickname = createEvent<string>();
export const setStatus = createEvent<string>();
export const setDescription = createEvent<string>();

export const $ageDate = createStore<string>("").on(setAgeDate, (_, val) => val.replace(/\D/g, ""));
export const $ageYear = createStore<string>("").on(setAgeYear, (_, val) => val.replace(/\D/g, ""));
export const $ageMonth = createStore<string>("Января").on(setAgeMonth, (_, val) => val);
export const $nickname = createStore<string>("").on(setNickname, (_, val) => val);
export const $nicknameError = createStore<boolean>(false)
    .reset(setNickname)
    .on(setNickname, (_, val) => val.length < 4);
export const $status = createStore<string>("Не задано").on(setStatus, (_, val) => val);
export const $description = createStore<string>("Не задано").on(setDescription, (_, val) => val);


$nickname.on($profileData,(_,data)=>data?.nickname||'')
$status.on($profileData,(_,data)=>data?.status||'Не задано')
$description.on($profileData,(_,data)=>data?.description||'Не задано')
$ageDate.on($profileData,(_,data)=>{
    const dob = data?.dob || "";
        const [day] = dob.split("/");
        return day || "";
})
$ageMonth.on($profileData,(_,data)=>{
    const dob = data?.dob || "";
        const [, month] = dob.split("/");
        return month || "Января";
})
$ageYear.on($profileData,(_,data)=>{
    const dob = data?.dob || "";
        const [, , year] = dob.split("/");
        return year || "";
})


sample({
    clock: changeProfileDataFx.doneData,
    source: $nickname,
    target: fetchProfilefx
});