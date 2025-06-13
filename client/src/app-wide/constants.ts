// const oldBaseURL='http://localhost:3000'
import axios from "axios"

const baseURL='http://192.168.0.104:3000'

export default baseURL

export const months = [
    "Января", "Февраля", "Марта", "Апреля", 
    "Мая", "Июня", "Июля", "Августа", 
    "Сентября", "Октября", "Ноября", "Декабря"
]

export const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})

export const forbiddenKeys = [
    'Tab', 'Alt', 'Control', 'Shift', 'Meta',
    'Escape', 'CapsLock', 'ContextMenu',   
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
    'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'PageUp', 'PageDown', 'Home', 'End',
    'Insert', 'Delete', 'Pause', 'ScrollLock', 
    'NumLock', 'PrintScreen','Enter','GroupNext'
  ];