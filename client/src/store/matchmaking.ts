import { createStore,createEvent } from "effector";
import { ImatchedProfile } from "../app-wide/types/types";

export const setMatching=createEvent<boolean>()
export const setMatchData=createEvent<ImatchedProfile>()
export const resetMatchData=createEvent()
export const setIsOpenModal=createEvent<boolean>()

export const $matching=createStore<boolean>(false).on(setMatching,(_,val)=>val)
export const $matchData=createStore<ImatchedProfile|null>(null).on(setMatchData,(_,val)=>val).reset(resetMatchData)
export const $isOpenModal=createStore<boolean>(false).on(setIsOpenModal,(_,val)=>val)

