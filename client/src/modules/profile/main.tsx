import { MainContent,ProfileData,DecorativeGradient } from "../../UI/profile/main-content";
import { ProfileMainHeader } from "./main-header";
import { ProfilePicAndChangeButton } from "../../UI/profile/picture-name-status";
import { PictureAndStatus } from "../../components/profile/picture-status-name";
import { ChangeProfile } from "./change-profile";
import { $myProfile } from "../../store/profile-store";
import { useUnit } from "effector-react";
import { RestOfProfileData } from "./rest-of-data";
export const Main=() => {
    const myProfile=useUnit($myProfile)
    return( 
        <MainContent>
            <ProfileMainHeader/>
            <ProfileData>
                <DecorativeGradient/>
                <ProfilePicAndChangeButton>
                    <PictureAndStatus/>
                    {myProfile && <ChangeProfile/>}         
                </ProfilePicAndChangeButton>
                <RestOfProfileData/>
            </ProfileData>
        </MainContent>

    )
}
