import { createStore, createEffect, createEvent } from "effector";
import { fetchProfile } from "../modules/profile/api/fetch-profile";
import { ProfileData } from "../modules/profile/api/fetch-profile";
import baseURL from "../app-wide/constants";
import { uploadPhoto } from "../modules/profile/api/upload-photo";

export const fetchProfilefx = createEffect(async (nickname: string) => {
  const req = await fetchProfile(nickname);
  return req;
});

export const uploadPhotofx = createEffect(async (photo: FormData) => {
  const req = await uploadPhoto(photo);
  return req;
});

export const setBeingEdited = createEvent<boolean>();
export const updateOnlineStatus = createEvent<boolean>();

export const setLastProfiles = createEvent<string[]>();

export const $profileData = createStore<ProfileData | null>(null);
export const $lastProfiles = createStore<string[]>([]).on(
  fetchProfilefx.doneData,
  (arr, profile) => {arr.push('/profile/'+profile.profile.nickname)}
).on(setLastProfiles,(_,mutated)=>mutated)

$profileData
  .on(fetchProfilefx.doneData, (_, val) => val?.profile ?? null)
  .on(updateOnlineStatus, (state, val) => {
    if (state) {
      return {
        ...state,
        online: val,
      };
    }
  });

export const $photoLink = createStore<string | null>(null)
  .on(fetchProfilefx.doneData, (_, val) => baseURL + val.photo)
  .on(uploadPhotofx.doneData, (_, val) => baseURL + val.url);

export const $myProfile = createStore<boolean>(false).on(
  fetchProfilefx.doneData,
  (_, val) => val.myProfile
);

export const $beingEdited = createStore<boolean>(false)
  .on(setBeingEdited, (_, val) => val)
  .reset(fetchProfilefx);