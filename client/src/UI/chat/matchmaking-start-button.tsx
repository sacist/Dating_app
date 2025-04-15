import styled from "styled-components";



interface MatchmaikingStartButtonProps {
    onClick: () => void
}
export const MatchmakingStartButton = ({ onClick }: MatchmaikingStartButtonProps) => {
    return (
        <MatchmakingButton onClick={onClick}>
            <MatchmakingSvg viewBox="160 260 90 90" xmlns="http://www.w3.org/2000/svg">
                <path d="m 189.15106,271.00919 c -16.36395,25.82487 -6.13124,67.60133 24.74864,77.07478" />
                <path d="m 189.15107,271.50922 c 32.09573,2.85285 48.39693,40.47572 41.01228,68.79643" />
                <path d="m 188.79751,271.00919 33.94113,74.24621" />
                <path d="m 171.11984,287.97975 c 16.74685,8.85302 37.73485,-2.8244 44.54772,-19.09171" />
                <path d="m 166.52364,306.01098 c 24.60224,7.89225 54.44926,-4.40807 65.05383,-28.28428" />
                <path d="m 169.70563,325.80996 c 27.65718,6.82915 61.50704,-5.53724 72.47844,-33.23398" />
                <path d="m 180.66579,340.30565 c 24.57844,8.65261 55.43914,-4.1511 64.70028,-28.99143" />
                <path d="m 201.76756,269.76019 
                 a 39.766212,40.835579 0 0 1 40.10069,40.37268 
                 a 39.766212,40.835579 0 0 1 -39.65388,40.83542 
                 a 39.766212,40.835579 0 0 1 -39.87791,-40.6047 
                 a 39.766212,40.835579 0 0 1 39.42856,-41.06483" />
            </MatchmakingSvg>
        </MatchmakingButton>
    )
}


const MatchmakingButton = styled.button`
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
    margin-left: 20px;
`

const MatchmakingSvg = styled.svg`
    width: 45px;
    height: 45px;
    stroke: navy;
    fill: none;
    stroke-width: 4;
`