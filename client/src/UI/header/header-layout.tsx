import { ReactNode } from "react"
import styled from "styled-components"


// Я думаю может понадобиться сдвинуть вверх хедер, поэтому пропс

interface HeaderLayoutProps{
    children?:ReactNode
    $paddingtop?:string
}

export const HeaderLayout=({children,$paddingtop}:HeaderLayoutProps) => {
    return(
        <HeaderWrapper $paddingtop={$paddingtop}>{children}</HeaderWrapper>
    )
}

const HeaderWrapper=styled.header<{$paddingtop?:string}>`
    width: 70%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding-top: ${({$paddingtop})=>$paddingtop};
`