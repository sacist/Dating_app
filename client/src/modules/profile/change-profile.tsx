import { ChangeProfileButton } from "../../UI/profile/change-profile";
import { setBeingEdited,$beingEdited,$profileData,fetchProfilefx } from "../../store/profile-store";
import { useUnit } from "effector-react";
import { $ageDate,$ageMonth,$ageYear,$nickname,$description,$status,changeProfileDataFx,$nicknameError } from "../../store/profile-change-data";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

export const ChangeProfile=() => {
    const beingEdited=useUnit($beingEdited)
    const ageDate=useUnit($ageDate)
    const ageMonth=useUnit($ageMonth)
    const ageYear=useUnit($ageYear)
    const nickname=useUnit($nickname)
    const description=useUnit($description)
    const status=useUnit($status)
    const profileData=useUnit($profileData)
    const nicknameError=useUnit($nicknameError)
    const {nickname:paramsNickname}=useParams()
    const nav=useNavigate()

    
    const changeProfile=async(ageDate:string,ageMonth:string,ageYear:string,nickname:string,description:string,status:string) => {
        let combinedAge=null
        if(ageDate&&ageMonth&&ageYear){
            combinedAge=ageDate+'/'+ageMonth+'/'+ageYear
        }
        if(profileData?.dob===combinedAge&&profileData.nickname===nickname&&profileData.status===status&&profileData.description===description){
            return
        }
        try {     
            const res=await changeProfileDataFx({nickname,dob:combinedAge,status,description})
            if(res.success){
                nav(`/profile/${nickname}`)     
            }
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 409 && paramsNickname) {
                fetchProfilefx(paramsNickname);
            }
        }
        
    }
    return(
            <>
            {beingEdited?
            <ChangeProfileButton onClick={async()=>{
                await changeProfile(ageDate,ageMonth,ageYear,nickname,description,status)
                if(nicknameError){
                    return 
                }
                setBeingEdited(false)}}>Сохранить</ChangeProfileButton>
            :
            <ChangeProfileButton onClick={()=>setBeingEdited(true)}>Изменить</ChangeProfileButton>
            }
            </>
    )
}