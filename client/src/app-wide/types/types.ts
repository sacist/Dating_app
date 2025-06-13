interface Imatch{
    description:string|null,
    dob:string|null,
    gender:'М'|'Ж',
    name:string,
    nickname:string,
    status:string|null
}

export interface ImatchedProfile{
    match:Imatch,
    photo:`/photos/${string}`,
    roomId:string
}
export type messageItem=string|false