import { axiosInstance } from "./fetch-profile";


interface uploadPhotoResponse{
    success:boolean
    url:string
}

export const uploadPhoto=async(formData: FormData):Promise<uploadPhotoResponse>=>{
    const req=await axiosInstance.post('/profile/upload-photo',formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return req.data
}
