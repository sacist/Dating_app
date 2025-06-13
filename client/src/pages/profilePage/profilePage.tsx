import { SidePanel } from "../../modules"
import { Main } from "../../modules"
import { ProfilePageWrapper } from "../../UI/profile/page-wrapper"
import { useProfileSocketEvent } from "../../app-wide/hooks/websocket events/profile-page"
import { Background } from "../../UI/profile/main-content"
import { GoBack } from "../../components/shared/go-back"
import { useEffect } from "react"
import { $profileData } from "../../store/profile-store"
import { useUnit } from "effector-react"
export const ProfilePage=() => {
    useProfileSocketEvent()
    const nickname=useUnit($profileData)?.nickname
    useEffect(()=>{
        document.title=`Профиль - ${nickname}`
    },[nickname])
    return(
        <Background>
            <GoBack/> 
            <ProfilePageWrapper>
                <SidePanel/>
                <Main/>
            </ProfilePageWrapper>
        </Background>
    )
}