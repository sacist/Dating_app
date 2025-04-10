import { SidePanel } from "../../modules"
import { Main } from "../../modules"
import { ProfilePageWrapper } from "../../UI/profile/page-wrapper"
import { useProfileSocketEvent } from "../../app-wide/hooks/websocket events/profile-page"
import { Background } from "../../UI/profile/main-content"
import { GoBack } from "../../components/shared/go-back"
export const ProfilePage=() => {
    useProfileSocketEvent()
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