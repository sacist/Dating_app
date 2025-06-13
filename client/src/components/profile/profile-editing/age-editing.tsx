import { AgeChangeContainer,AgeChangeInput,AgeChangeMonthSelect } from "../../../UI/profile/change-profile"
import { useUnit } from "effector-react"
import { $ageDate,$ageYear,setAgeDate,setAgeMonth,setAgeYear } from "../../../store/profile-change-data"
import { months } from "../../../app-wide/constants"
import { MainText } from "../../../UI/main-text"
import { RestOfContentItem } from "../../../UI/profile/main-content"

export const ProfileAgeEditing = () => {
    const ageDate=useUnit($ageDate)
    const ageYear=useUnit($ageYear)
    return (
        <RestOfContentItem>
            <MainText $fontweight={600} $fontsize="20px">Дата рождения:</MainText>
            <AgeChangeContainer>
                <AgeChangeInput placeholder="день" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAgeDate(e.target.value) }}
                    value={ageDate} maxLength={2} $filled={ageDate.length >= 2 && (+ageDate <= 31)} $error={+ageDate > 31} />
                <AgeChangeMonthSelect onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAgeMonth(e.target.value)}>
                    {months.map((val, ind) =>
                        <option key={ind} value={val}>{val}</option>
                    )}
                </AgeChangeMonthSelect>
                <AgeChangeInput placeholder="год" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAgeYear(e.target.value) }}
                    value={ageYear} maxLength={4} $filled={ageYear.length >= 4 && (+ageYear >= 1960)}
                    $error={(+ageYear < 1960 || +ageYear > new Date().getFullYear()) && (ageYear.length >= 4)} />
            </AgeChangeContainer>
        </RestOfContentItem>
    )
}