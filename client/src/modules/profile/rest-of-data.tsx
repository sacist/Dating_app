import { ProfileAge } from "../../components/profile/age";
import { ProfileAgeEditing } from "../../components/profile/profile-editing/age-editing";
import { useUnit } from "effector-react";
import { $beingEdited } from "../../store/profile-store";
import { ProfileNickname } from "../../components/profile/nickname";
import { NicknameEditing } from "../../components/profile/profile-editing/nickname-editing";
import { ProfileStatus } from "../../components/profile/status";
import { StatusEditing } from "../../components/profile/profile-editing/status-editing";
import { FlexContainer } from "../../UI/profile/change-profile";
import { ProfileDescription } from "../../components/profile/description";
import { DescriptionEditing } from "../../components/profile/profile-editing/description-editing";
export const RestOfProfileData = () => {
    const beingEdited = useUnit($beingEdited)
    return (
        <>
            {beingEdited ? (
                <FlexContainer>
                    <div>
                        <ProfileAgeEditing />
                        <NicknameEditing />
                        <StatusEditing />
                    </div>
                    <DescriptionEditing/>
                </FlexContainer>

            ) : (
                <FlexContainer>
                    <div>
                        <ProfileAge />
                        <ProfileNickname />
                        <ProfileStatus />
                    </div>
                    <ProfileDescription/>
                </FlexContainer>
            )}
        </>
    )
}