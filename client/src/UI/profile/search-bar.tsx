import styled from "styled-components";




export const Input = styled.input<{ $filled: boolean, $width?: string, $padding?: string, $fontsize?: string, $height?: string }>`
  border-radius: 0px 5px 5px 0px;
  font-size: ${({ $fontsize }) => $fontsize};
  padding: ${({ $padding }) => $padding};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border: none;
  transition: background-color 0.3s, border-color 0.3s;
  outline: none;
`;
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const SearchIcon = () => {
  return (
    <SearchIconWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="10" cy="10" r="7" />
        <path d="M21 21l-5.2-5.2" />
      </svg>
    </SearchIconWrapper>
  )
}
export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 42px;
  width: 40px;
  border-radius: 5px 0px 0px 5px;
`

export const FoundUsersWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 200px;
  background-color: #f0f8ff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 5px;
  z-index: 10;
  overflow: hidden;
`;

export const FoundUser = styled.div`
  width: 100%;
  padding: 10px;
  padding-left: 15px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #e6f08cda;
    transform: scale(1.0001);
  }
  transition: background-color 0.1s ease, transform 0.05s ease;
  
`;
