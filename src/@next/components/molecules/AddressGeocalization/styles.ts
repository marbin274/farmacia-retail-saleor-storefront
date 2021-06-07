import { mediaUp } from "@temp/@next/globalStyles";
import { largeScreen, white } from "@temp/@next/globalStyles/constants";
import styled, { css, keyframes } from "styled-components";
import { addressLocationType } from "./types";



export const Wrapper = styled.div`
    align-items: baseline;    
    display:flex;
    padding: 0rem 1.25rem;
    position: relative;
    width: 100%;   
`;

export const Localization = styled.div<{ mode: addressLocationType }>`
    color: ${({ mode, theme }) => mode === "ligth" ? theme.colors.white : theme.colors.aunaBlack};
    display: flex;
    flex: 3;
`;

export const GeocalizationIcon = styled.div`
    .icon_button {
        height: 2.5rem;
        margin: 0.2rem 0rem;
        width: 2.5rem;
    }
`;

export const District = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0rem .5rem;
    max-width: 10rem;
    ${mediaUp.xSmallScreen`
        max-width: 12rem;
    `}
    ${mediaUp.smallScreen`
        max-width: 100%;
    `}
    ${mediaUp.mediumScreen`
        max-width: 8.125rem;
    `}
`;

export const Label = styled.span`
    font-size: ${({theme}) => theme.typography.labelFontSize};
    font-weight: normal;
`;

export const Address = styled.span`
    font-size: ${({theme}) => theme.typography.smallFontSize};
    font-weight: ${({theme}) => theme.typography.boldFontWeight};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const Button = styled.div`
    color: #fff;
    flex: 1;
    > button {
        padding: 0.3rem 0.5rem;
        width: 100%;
        span {
            font-size: ${({theme}) => theme.typography.smallFontSize};
        }
    }
`;

const alertTop = 3.5;
const alertMove = 0.4;
const alertAnimation = 3.055;

const moved = keyframes`
    0%   {top:${alertTop}rem;}
    ${alertAnimation * 1}%  {top:${alertTop + alertMove}rem;}
    ${alertAnimation * 2}%  {top:${alertTop}rem}
    ${alertAnimation * 3}%  {top:${alertTop + alertMove}rem;}
    ${alertAnimation * 4}%  {top:${alertTop}rem}
    ${alertAnimation * 5}%  {top:${alertTop + alertMove}rem;}
    ${alertAnimation * 6}%  {top:${alertTop}rem}
`;

export const Alert = styled.div`
    background: ${white};
    border-radius: 1rem;
    box-shadow: 0px 0px 0.875rem rgb(0 0 0 / 50%);
    left: 0.5rem;
    padding: 1rem;
    position: absolute;    
    top: ${alertTop}rem;
    width: 18.5rem;
    z-index: 4;
    ${css`
        animation: ${moved};
        animation-delay: 4s;
        animation-duration: 12s;
        animation-iteration-count: infinite
        animation-timing-function: ease-in-out;
    `}       

    ::after {
        top: -1.375rem;
        border-color: transparent transparent white transparent;
        border-style: solid;
        border-width: 0.7rem;
        content: ' ';
        position: absolute;
        left: calc(50% - 5.35rem);
        z-index: 1;
    }

    ${mediaUp.xSmallScreen`
        width: 21.5rem;
        ::after{
            left: calc(50% - 7.35rem);
        }
    `}
    ${mediaUp.smallScreen`
        width: 23.5rem;
    `}
    ${`@media (min-width: ${largeScreen}px) and (max-width: 1144px){
        left: -3rem;
        width: 18.5rem;
        ::after {
            left: calc(50% - 3.35rem);
        }
    }
    `}
`;


export const AlertBody = styled.div`    
    color: #151515;
    display: flex;
`;

export const AlertIcon = styled.div`
    align-items: center;
    background-color: #F6F8FA;
    border-radius: 1rem;
    display: flex;
    flex: 1;
    justify-content: center;    
`;

export const AlertText = styled.span`
    flex: 3
    margin-left: 1rem;
    > span {
        font-weight: ${({theme}) => theme.typography.boldFontWeight};
    }
`;

export const AlertAction = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 1rem;
    > div: first-child{
        width: 117px;
    }
    > div: nth-child(2){
        margin-left: 1rem;
        width: 10.188rem;
    }
    button {
        padding: 0.5rem;
        width: 100%;
    }
    span {
        font-size:${({theme}) => theme.typography.smallFontSize};
    }
`;

