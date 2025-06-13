import { ReactNode } from "react"

export interface ChildrenOnClick {
    children: ReactNode
    onClick?:()=>void
}

export interface ReactChildProps{
    children:ReactNode
}