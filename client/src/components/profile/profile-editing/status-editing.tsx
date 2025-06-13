import { RestOfContentItem } from "../../../UI/profile/main-content"
import { MainText } from "../../../UI/main-text"
import { StatusChangeInput } from "../../../UI/profile/change-profile"
import { useUnit } from "effector-react"
import { $status,setStatus } from "../../../store/profile-change-data"
export const StatusEditing=() => {
    const status=useUnit($status)
    return(
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">Статус:</MainText>
            <StatusChangeInput $filled={status.length>=4} value={status} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
                setStatus(e.target.value)
            }} spellCheck={false} maxLength={52}/>
        </RestOfContentItem>
    )
}