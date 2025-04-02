import { io } from "socket.io-client"
import baseURL from "../../app-wide/constants"
import { createEffect,createStore    } from "effector";
import { Socket } from "socket.io-client";


export const initSocketFx=createEffect(():Socket=>{
    const socket = io(baseURL, {
        withCredentials: true,
    });
    if(socket){
        socket.on('entered-matchmaking',()=>{
          console.log('Матчмейкинг начался');
          
      })
      socket.on('match-found',(data)=>{
          console.log('Найден матч');
          console.log(data);
          
      })
      }
    return socket
})

export const $socketInited=createStore<boolean>(false).on(initSocketFx.doneData,(_,socket)=>{
    if(socket) return true
})
export const $socket=createStore<Socket|null>(null).on(initSocketFx.doneData,(_,socket)=>socket)