import { MatchmakingModalInfo } from "../../UI/chat/matchmaking/matchmaking-modal";
import { useUnit } from "effector-react";
import { $matchData } from "../../store/matchmaking";
import baseURL from "../../app-wide/constants";
import { ProfilePic } from "../../UI/profile-pic";
import { MainText } from "../../UI/main-text";
import getAgeFromDOB from "../../app-wide/functions/age-form-dob";
import { DescriptionModal } from "../../UI/chat/matchmaking/matchmaking-modal";

export const MMInfo=() => {
    const matchData=useUnit($matchData)
    return(
        <>
        {matchData&&
        <MatchmakingModalInfo>
            <ProfilePic $width="220px" $height='220px' src={baseURL+matchData.photo} $borderradius="15px"/>
            <MainText $fontsize="24px">{matchData.match.name}, {matchData.match.dob&&getAgeFromDOB(matchData.match.dob)}</MainText>
            <DescriptionModal>
                <MainText $fontsize="18px" style={{ whiteSpace: 'pre-wrap' }}>{matchData.match.description}</MainText>
            </DescriptionModal>
        </MatchmakingModalInfo>
        }
        </>
    )
}