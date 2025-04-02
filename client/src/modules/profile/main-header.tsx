import { MainHeader } from "../../UI/profile/main-content";
import { $myProfile,$photoLink } from "../../store/profile-store";
import { useUnit } from "effector-react";
import { ProfilePic } from "../../UI/profile-pic";
import styled from "styled-components";
import { MainText } from "../../UI/main-text";
import { $profilePhotoLink,$nickname } from "../../store/check-login-store";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./search-bar";
import { Notifications } from "../../components/profile/notifications";

export const ProfileMainHeader = () => {
    const profilePhotoLink=useUnit($profilePhotoLink)
    const myProfile=useUnit($myProfile)
    const nickname=useUnit($nickname)
    const photoLink=useUnit($photoLink)
    const nav=useNavigate()
    return (
        <MainHeader>
            <UserInfo>
                <FlexContainerLeft>
                    <MainText $fontsize="35px">{`Профиль`}</MainText>
                </FlexContainerLeft>
            </UserInfo>
            <FlexContainerRight>
                <SearchBar/>
                <Notifications/>
                <ProfilePic src={myProfile?photoLink:profilePhotoLink} alt="profilePic" $cursorpointer={!myProfile}
                 onClick={()=>{!myProfile && nav(`/profile/${nickname}`)}} $borderradius="20%" $width="50px" $height="50px"/>
            </FlexContainerRight>
        </MainHeader>
    )
}






const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const FlexContainerLeft=styled.div`
    display: flex;
`
const FlexContainerRight=styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`