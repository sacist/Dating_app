import '@fontsource/rubik'
import styled from 'styled-components'




export const MainText=styled.span<{$color?:string,$nouserselect?:boolean,$fontsize?:string,$fontweight?:number}>`
    font-family: 'Rubik';
    color: ${({$color})=>$color};
    user-select: ${({$nouserselect})=>$nouserselect && 'none'};
    font-size: ${({$fontsize})=>$fontsize};
    font-weight: ${({$fontweight})=>$fontweight};
`