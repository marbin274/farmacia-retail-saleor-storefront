import { styled } from "@styles";
import { css, keyframes } from "styled-components";

export interface ISkeletonProps {
    animation?: boolean | "pulse" | "wave";
    height?: number;
    width?: number;
}

const wave = keyframes`
0% {
    transform: translateX(-100%);
  }
  60% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const pulse = keyframes`
0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -135% 0%;
  }
`;

const skeletonPulse = css`
    animation: ${pulse};
    animation-duration: 1.2s;
    animation-iteration-count: infinite
    animation-timing-function: ease-in-out;
    background: linear-gradient(-90deg,${({ theme }) => theme.colors.aunaDisabledBackground} 0%,#EDECF0 50%,${({ theme }) => theme.colors.aunaDisabledBackground} 100%);
    background-size: 400% 400%;
`;

const skeletonWave = css`    
    transform-origin: 0 60%;
    &::after{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        position: absolute;
        animation: ${wave};
        animation-duration: 1.6s;
        animation-iteration-count: infinite
        animation-timing-function: linear;
        transform: translateX(-100%);
        background: linear-gradient(90deg,transparent,#EDECF0 50%,#EDECF0 50%,transparent);
    }
`;

export const Wrapper = styled.div<ISkeletonProps>`
    background-color: ${({ theme }) => theme.colors.aunaDisabledBackground};
    border-radius: 0.25rem; 
    transform: scale(1);
    height: ${({ height }) => !!height ? `${height}rem` : "100%"};
    margin: 0.5rem 0rem;
    overflow: hidden;
    width: ${({ width }) => !!width ? `${width}rem` : "100%"};
    ${({ animation }) =>
        animation === "pulse" ?
            skeletonPulse
            : (animation === "wave" ? skeletonWave
                : "")
    }
    
`;
