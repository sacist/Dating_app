import { createStore,createEvent } from "effector";


export const setMatching=createEvent<boolean>()

export const $matching=createStore<boolean>(false).on(setMatching,(_,val)=>val)