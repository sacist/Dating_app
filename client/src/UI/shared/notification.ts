import styled from "styled-components";

export const NotificationWrapper=styled.div<{$display:boolean,$error:boolean}>`
    width: 430px;
    height: 30px;
    position: fixed;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    align-items: center;
    opacity: 1;
    background-color: ${({ $error }) => ($error ? "rgba(255, 77, 77, 0.9)" : "rgba(76, 175, 80, 0.9)")};
    border-radius: 8px;
    padding: 8px 16px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    top: ${({ $display }) => ($display ? "20px" : "-50px")}; 
    opacity: ${({ $display }) => ($display ? "1" : "0")};  
    transition: top 0.5s ease-in-out, opacity 0.4s ease-in-out;
    z-index: 1000000;
`