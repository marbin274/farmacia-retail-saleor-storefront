import { styled } from "@styles";
import { css } from "styled-components";

const div = css`
    position: relative;       
    height: 0.125rem;
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 0.25rem;
    transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width, 0.3s ease right;
    border-radius: 0.125rem;    
`;

export const Wrapper = styled.label<{open:boolean}>`    
    cursor: pointer;
    display: block;
    margin: 0.2rem;
    height: 0.875rem;
    width: 0.875rem;
    div {
        ${div}
    }
`;

export const FirstLine = styled.div<{open:boolean}>`
    transform-origin: 0;
    ${({open})=>open && `
        top: -0.063.rem;
        transform: rotateZ(45deg);
    `}
`;

export const SecondLine = styled.div<{open:boolean}>`   
    right: 0;
    width: 0.875rem;
    ${({open})=>open && `
        right: 0.188rem;
        transform: rotateZ(-45deg);
        width: 1.25rem;
    `}
`;

export const ThirdLine = styled.div<{open:boolean}>`
    margin-bottom: 0rem !important;
    transform-origin: 0.875rem;
    ${({open})=>open && `
    top: 0.063rem;
        transform: rotateZ(45deg);
    `}
`;
