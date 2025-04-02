import { RestOfContentItem } from "../../../UI/profile/main-content"
import { MainText } from "../../../UI/main-text"
import { NicknameChangeInput } from "../../../UI/profile/change-profile"
import { $nickname,setNickname} from "../../../store/profile-change-data"
import { useUnit } from "effector-react"
import { $notification } from "../../../store/notification"
export const NicknameEditing=() => {
    const nickname=useUnit($nickname)
    const notification=useUnit($notification)
    return(
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">Никнейм:</MainText>
            <NicknameChangeInput $filled value={nickname} maxLength={15}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setNickname(e.target.value)}} $error={nickname.length<4}
                $nicknameerror={notification==='Никнейм должен содержать минимум 4 символа'}/>
        </RestOfContentItem>
    )
}