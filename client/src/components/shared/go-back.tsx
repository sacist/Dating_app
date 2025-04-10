import { GoBackSVG } from "../../UI/shared/go-back"
import { useUnit } from "effector-react"
import { $lastProfiles,setLastProfiles } from "../../store/profile-store"
import { useNavigate } from "react-router-dom"
export const GoBack=() => {
    const lastProfiles=useUnit($lastProfiles)
    const nav=useNavigate()
    return(
        <GoBackSVG 
        onClick={()=>{
            if(lastProfiles.length>=2){
                const link = lastProfiles[lastProfiles.length - 2]
                nav(link)
                setLastProfiles(lastProfiles.filter((_, ind) => ind !== lastProfiles.length - 2&&ind !== lastProfiles.length - 1));
            }
            }}
        />
    )
}