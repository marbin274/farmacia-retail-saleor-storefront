import { mediaUp } from "@temp/@next/globalStyles";
import { white } from "@temp/@next/globalStyles/constants";
import styled from "styled-components";

export const Modal = styled.div`
    align-items: center;
    background-color: ${white};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    width: 100%;
    ${mediaUp.largeScreen`
        margin: 0 auto;
        width: 70%;
    `}
`;

export const Header = styled.div`
    width: 100%;
`;
export const Content = styled.div`
    padding: 1rem;
    ${mediaUp.largeScreen`
        padding: 1rem 3rem;
    `}

`;

export const CloseIcon = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
`;

export const Icon = styled.div`
    text-align: center
`;
export const Title = styled.p`
    padding: 1rem 0rem;
    text-align : center;
`;
export const Body = styled.div`
    width: 100%
    > p {
        font-size: ${({ theme }) => theme.typography.smallFontSize};
        line-height: 1.375rem;
        margin-bottom: 1rem;
        text-align: center;
    }
    > div {
        padding: 0px;
    }
`;
export const Actions = styled.div`
    width: 100%;
    button {
        width: 100%;
    }
`;

export const TextInfo = styled.div`
    display: flex;
    font-size:  ${({ theme }) => theme.typography.smallFontSize};
    > svg {
        margin-right: .5rem;
    }
    > span {
        margin-bottom: 1rem;
    }
`;
