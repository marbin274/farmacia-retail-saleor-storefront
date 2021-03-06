import { mediaUp, media } from '@temp/@next/globalStyles';
import { white } from '@temp/@next/globalStyles/constants';
import styled from 'styled-components';

export const Modal = styled.div`
  align-items: center;
  background-color: ${white};
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  width: 100%;
  ${mediaUp.largeScreen`
        margin: 0 auto;
        width: 21.25rem;
    `}
`;

export const Header = styled.div`
  width: 100%;
`;
export const Content = styled.div`
  padding: 1rem 2rem;
  svg {
    margin: 0 auto;
  }
  ${media.mediumScreen`
        padding: 1rem 2rem;
        svg {
            margin: 0 auto;
        }
    `}
`;

export const CloseIcon = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;

export const Icon = styled.div`
  text-align: center svg {
    margin: 0 auto;
  }
`;
export const Title = styled.p`
  padding: 1rem 0rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
`;
export const Body = styled.div`
  width: 100% > p {
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    line-height: 1.375rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  > div {
    padding: 0px;
    align-items: center;
  }
  > p {
    margin: auto;
  }
`;
export const Actions = styled.div`
  button {
    width: 100%;
  }
  margin-top: 24px;
  width: 100%;
`;

export const TextInfo = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  > svg {
    margin-right: 0.5rem;
  }
  > span {
    margin: 1rem 0 1.5rem 0;
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
export const CartBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const CartItemQuantity = styled.div`
  left: 6.2rem;
  position: absolute;
  top: 0.3rem;
  margin-left: 0.8rem;
  @media (max-width: $medium-screen) {
    top: -0.5rem;
  }
  > span {
    color: white;
    position: relative;
    margin: auto;
  }
`;
export const CartIcon = styled.img`
  margin: auto;
  height: 80px;
  width: 80px;
`;
