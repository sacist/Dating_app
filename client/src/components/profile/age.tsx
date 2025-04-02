import { RestOfContentItem } from "../../UI/profile/main-content";
import { $profileData } from "../../store/profile-store";
import { useUnit } from "effector-react";
import { MainText } from "../../UI/main-text";


export const ProfileAge = () => {
    const dob = useUnit($profileData)?.dob

    return (
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">Дата рождения:</MainText>  
            <MainText $fontsize="18px" $color="#161212">{dob ? dob.split('/').join(' ') : 'Не указано'}</MainText>
        </RestOfContentItem>
    )
}
