import { RestOfContentItem } from "../../UI/profile/main-content"
import { MainText } from "../../UI/main-text"
import { useUnit } from "effector-react"
import { $profileData } from "../../store/profile-store"
import { DescriptionContainer } from "../../UI/profile/change-profile"

export const ProfileDescription = () => {
    const description = useUnit($profileData)?.description

    return (
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">О себе:</MainText>
            <DescriptionContainer>
                <MainText $fontsize="18px" $color="#161212">{description ? description : 'Не указано'}</MainText>
            </DescriptionContainer>
        </RestOfContentItem>
    )
}