import { Input, SearchWrapper,SearchIcon,FoundUsersWrapper,FoundUser } from "../../UI/profile/search-bar";
import { useState,useEffect,useRef,useMemo } from "react";
import { findByNickname,FindByNicknameResponse } from "./api/find-by-nickname";
import debounce from "../../app-wide/debounce-function";
import { MainText } from "../../UI/main-text";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
    const [searchBarVal, setSearchBarVal] = useState<string>('')
    const [foundUsers,setFoundUsers]=useState<FindByNicknameResponse|null>(null)
    const controllerRef=useRef<AbortController|null>(null)

    const debouncedFind = useMemo(
        () =>
            debounce(async (nickname: string) => {

                controllerRef.current?.abort();
                const controller = new AbortController();
                controllerRef.current = controller;

                try {
                    const users = await findByNickname(nickname, controller.signal);
                    setFoundUsers(users);
                } catch (e: any) {
                    console.error(e)
                }
            }, 250),
        []
    );
    
    useEffect(()=>{
        debouncedFind(searchBarVal)

        return ()=>{
            controllerRef.current?.abort()
        }
    },[searchBarVal])

    const nav=useNavigate()

    return (
        <div style={{ position: "relative" }}>
            <SearchWrapper>
                <SearchIcon />
                <Input 
                    $filled={searchBarVal.length > 3} 
                    $width="140px" 
                    $height="40px"
                    $fontsize="18px" 
                    value={searchBarVal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchBarVal(e.target.value)}
                    placeholder="Поиск по нику" 
                    maxLength={15}
                />
            </SearchWrapper>
                <FoundUsersWrapper >
                    {foundUsers?.foundUsers?.map((val, ind) => (
                        <FoundUser key={ind} onClick={()=>{
                            setSearchBarVal('')
                            nav(`/profile/${val.nickname}`)}}>
                            <MainText $fontsize="16px" $color="#333333">{val.nickname}</MainText>
                        </FoundUser>
                    ))}
                </FoundUsersWrapper>
            
        </div>
    );
}