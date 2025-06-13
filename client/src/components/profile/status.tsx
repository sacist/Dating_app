import { RestOfContentItem } from "../../UI/profile/main-content";
import { $profileData } from "../../store/profile-store";
import { useUnit } from "effector-react";
import { MainText } from "../../UI/main-text";
import { StatusContainer } from "../../UI/profile/change-profile";

export const ProfileStatus=() => {
    const status=useUnit($profileData)?.status
    return(
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">Статус:</MainText>
            <StatusContainer>
            <MainText $fontsize="18px" $color="#161212">{status?status:'Не указано'}</MainText>
            </StatusContainer>
        </RestOfContentItem>
    )
}