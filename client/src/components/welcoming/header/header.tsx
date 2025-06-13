import styled from "styled-components"
import { HeaderLayout } from "../../../UI/header/header-layout"
import { HeaderLogo } from "../../../UI/header/header-logo"
import { Button } from "../../../UI/header/buttons";
import { useNavigate } from "react-router-dom";
import { ProfilePic } from "../../../UI/profile-pic";
import { $isLoggedIn,$profilePhotoLink,$nickname } from "../../../store/check-login-store";
import { useUnit } from "effector-react";


const HeaderButtons = () => {
    const navigate=useNavigate()
    const isLoggedIn=useUnit($isLoggedIn)
    const profilePhotoLink=useUnit($profilePhotoLink)
    const nickname=useUnit($nickname)
    if(isLoggedIn===null) return null
    return (
        <HeaderButtonsWrapper>
            {isLoggedIn?(
                    <ProfilePic src={profilePhotoLink} onClick={()=>{navigate(`/profile/${nickname}`)}} alt="Фото профиля" $cursorpointer/>
            ):(
                <>    
                <Button onClick={()=>navigate('/register/step1')}>{'Регистрация'}</Button>
                <Button onClick={()=>navigate('/login')}>{'Логин'}</Button>
                </>
            )}
        </HeaderButtonsWrapper>
    )
}
export const Header=() => {
    return(
        <HeaderLayout $paddingtop="40px">
            <HeaderLogo/>
            <HeaderButtons/>
        </HeaderLayout>
    )
}

const HeaderButtonsWrapper=styled.nav`
    display: flex;
    gap: 30px;
`
