import { LikeButton,DislikeButton,ModalButtonsWrapper } from "../../UI/chat/matchmaking/matchmaking-modal"
import { $matchData } from "../../store/matchmaking"
import { useUnit } from "effector-react"

interface IModalButtonsProps{
    likeClick:()=>void,
    dislikeClick:()=>void
}

export const MMButtons=({likeClick,dislikeClick}:IModalButtonsProps) => {
    const matchData=useUnit($matchData)
    return(
        <>
        {matchData&&
        <ModalButtonsWrapper>
            <DislikeButton onClick={dislikeClick}>Пропустить</DislikeButton>
            <LikeButton onClick={likeClick}>Нравится</LikeButton>
        </ModalButtonsWrapper>
        }
        </>
    )
}