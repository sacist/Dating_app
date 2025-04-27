import styled from "styled-components";
import adapt from "../../adaptive";


export const MatchmakingModalWrapper=styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
    position: fixed;
    z-index: 1000000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:0.5s ease-out;
`
export const MatchmakingModalWindow = styled.div`
    ${adapt("width", 350, 670)};
    ${adapt("height", 500, 760)};
    background-color:rgb(235, 239, 241);
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    gap: 23px;
`;

export const MatchmakingModalInfo=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 90px;
    gap: 20px;
`

export const DescriptionModal=styled.div`
    margin-top:30px;
    max-width: 600px;
    height: 250px;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    &:hover{
      background-color: rgba(0, 0, 0, 0.4);
    }
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`

export const ModalButtonsWrapper=styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom:0px;
`

export const DislikeButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.2);

  &:hover {
    background-color: #c0392b;
    box-shadow: 0 6px 12px rgba(192, 57, 43, 0.3);
  }
  margin-left: 20px;
  min-width: 125px;
`;

export const LikeButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(46, 204, 113, 0.2);

  &:hover {
    background-color: #27ae60;
    box-shadow: 0 6px 12px rgba(39, 174, 96, 0.3);
  }
  margin-right: 20px;
  min-width: 125px;
`;