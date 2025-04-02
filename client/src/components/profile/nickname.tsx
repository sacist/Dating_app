import { $profileData } from "../../store/profile-store"
import { MainText } from "../../UI/main-text"
import { RestOfContentItem } from "../../UI/profile/main-content"
import { useUnit } from "effector-react"

export const ProfileNickname=() => {
    const nickname=useUnit($profileData)?.nickname
    return(
    <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">Никнейм:</MainText>  
            <MainText $fontsize="18px" $color="#161212">{nickname}</MainText>
    </RestOfContentItem>
    )
}