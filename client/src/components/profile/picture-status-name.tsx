import { MainText } from "../../UI/main-text"
import { $profileData, $photoLink, $beingEdited,uploadPhotofx } from "../../store/profile-store"
import { useUnit } from "effector-react"
import { FetchedProfilePic, NameStatus, PicFlexWrapper } from "../../UI/profile/picture-name-status"
import { PhotoWrapper, HiddenInput, UploadPhotoButton } from "../../UI/profile/change-profile"
import { useRef } from "react"

export const PictureAndStatus = () => {
    const online = useUnit($profileData)?.online
    const name = useUnit($profileData)?.name
    const photoLink = useUnit($photoLink)
    const editing = useUnit($beingEdited)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload=(e:React.ChangeEvent<HTMLInputElement>) => {
        const maxSize = 5 * 1024 * 1024
        const file=e.target.files?.[0]
        if (file) {
            if(file.size>maxSize){
                alert("Файл слишком большой. Максимальный размер: 5 МБ.")
                return
            }
            const formData = new FormData();
            formData.append("photo", file);   
            uploadPhotofx(formData)
    }}

    return (
        <PicFlexWrapper>
            <PhotoWrapper>
                {editing &&
                    <>
                        <UploadPhotoButton onClick={()=>{
                                inputRef.current?.click()
                            }
                        }>         
                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </UploadPhotoButton>
                        <HiddenInput
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            onChange={handleUpload}
                        />
                    </>}
                <FetchedProfilePic src={photoLink} $editing={editing} />
            </PhotoWrapper>
            <NameStatus>
                <MainText $fontsize="24px">{name}</MainText>
                <MainText $color={online ? 'green' : 'blue'} $fontsize="16px">{online ? 'В сети' : 'Не в сети'}</MainText>
            </NameStatus>
        </PicFlexWrapper>
    )
}

