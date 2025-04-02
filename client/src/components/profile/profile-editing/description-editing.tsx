import { $description,setDescription } from "../../../store/profile-change-data"
import { useUnit } from "effector-react"
import { RestOfContentItem } from "../../../UI/profile/main-content"
import { MainText } from "../../../UI/main-text"
import { DescriptionChangeInput } from "../../../UI/profile/change-profile"
export const DescriptionEditing=() => {
    const description=useUnit($description)

    return(
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">О себе:</MainText>
            <DescriptionChangeInput onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
                setDescription(e.target.value)
            }} $filled={description.length!=0} maxLength={250} value={description} spellCheck={false}/>
        </RestOfContentItem>
    )
}