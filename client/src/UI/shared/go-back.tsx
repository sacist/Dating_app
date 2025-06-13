import styled from "styled-components";

interface GoBackSvgProps {
    onClick?: () => void;
}

export const GoBackSVG = ({ onClick }: GoBackSvgProps) => {
    return (
        <BackButton onClick={onClick}>
            <StyledSvg 
                width="48" 
                height="32" 
                viewBox="0 0 48 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M54 16H6M6 16L14 6M6 16L14 26"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </StyledSvg>
        </BackButton>
    );
};

const BackButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    left: 385px;
    top: 140px;
    cursor: pointer;
`;

const StyledSvg = styled.svg`
    path {
        transition: stroke 0.2s ease
    }
    &:hover path {
        stroke: #2cabca
    }
`;