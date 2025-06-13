import '@fontsource/montserrat'
import styled from 'styled-components'

export const HeaderLogo=() => {
    return(
        <LogoText>Speed Dater</LogoText>
    )
}

const LogoText=styled.div`
    font-family: "Montserrat";
    font-size: 50px;
    color: #FFC371;
    font-weight: 500;
    user-select: none;
`