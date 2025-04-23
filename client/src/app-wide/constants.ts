// const oldBaseURL='http://localhost:3000'
import axios from "axios"

const baseURL='http://192.168.0.105:3000'

export default baseURL

export const months = [
    "Января", "Февраля", "Марта", "Апреля", 
    "Мая", "Июня", "Июля", "Августа", 
    "Сентября", "Октября", "Ноября", "Декабря"
]

export const errorMessages=[
    'Никнейм занят','Ошибка на сервере',
    'Файл не загружен','Пользователь не найден',
    'Никнейм должен содержать минимум 4 символа'
]

export const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})