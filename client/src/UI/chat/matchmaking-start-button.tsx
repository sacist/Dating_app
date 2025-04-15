import styled from "styled-components";



type MatchmaikingStartButtonProps = {
    onClick: () => void
}

type Heart = {
    fill: string
}

const Heart = ({ fill }: Heart) => {
    return (
        <svg width="20" height="20" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z"
                fill={fill}
            />
        </svg>
    )
}
export const MatchmakingStartButton = ({ onClick }: MatchmaikingStartButtonProps) => {
    return (
        <MatchmakingButton onClick={onClick}>
            <CubeContainer>
                <Face className="front" ><Heart fill="#00CCCC"/></Face>
                <Face className="back" ><Heart fill="rgb(226, 226, 226)"/></Face>
                <Face className="right" ><Heart fill='#0077FF'/></Face>
                <Face className="left" ><Heart fill="#afdd30"/></Face>
                <Face className="top" ><Heart fill="#FFAE00"/></Face>
                <Face className="bottom" ><Heart fill="#f10fdf"/></Face>
            </CubeContainer>
        </MatchmakingButton>
    )
}


const MatchmakingButton = styled.button`
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
    margin-left: 20px;
    margin-right: 20px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`


const CubeContainer = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    transform-style: preserve-3d;
    animation: rotate 5s infinite linear;

    @keyframes rotate {
        0% {
            transform: rotateX(0deg) rotateY(0deg);
        }
        100% {
            transform: rotateX(360deg) rotateY(360deg);
        }
    }
`;

const Face = styled.div`
    position: absolute;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #000000;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    &.front {
        transform: translateZ(18px);
        background-color: #df0202;
    }

    &.back {
        transform: translateZ(-18px);
        background-color: black;
    }

    &.right {
        transform: rotateX(90deg) translateZ(18px);
        background-color: coral;
    }

    &.left {
        transform: rotateX(-90deg) translateZ(18px);
        background-color: blueviolet;
    }

    &.top {
        transform: rotateY(90deg) translateZ(18px);
        background-color: #0051ff;
    }

    &.bottom {
        transform: rotateY(-90deg) translateZ(18px);
        background-color: rgb(59, 224, 26);
    }
`;