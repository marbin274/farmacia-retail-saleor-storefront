import { styled, media, DefaultTheme } from '@styles';
import { aunaInteractive } from '@styles/constants';
import farmatheme from '@farmatheme';
import { ReactSVG } from 'react-svg';

export const WrapperThankyou = styled.div`
  background-color: #f6f7f9;
  padding-bottom: 6.25rem;
`;

export const WrapperProgressBar = styled.div`
  position: relative;
  padding-top: 1.75rem;
  padding-bottom: 1.875rem;
  background-color: #00bf8e;
  border-bottom-left-radius: 3.125rem;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.white};
  border-radius: 2rem;
  padding: 3rem 6rem;
  max-width: 38.75rem;
  margin: auto;
  margin-top: 2.625rem;

  ${media.smallScreen`
    padding: 3rem 2rem;
  `};

  button {
    margin-top: 2rem;
  }
`;

export const ThankYouHeader = styled.p`
  color: ${farmatheme.theme.colors.interactive};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  span {
    display: block;
    &:nth-child(1) {
      margin-bottom: 0.8rem;
    }
  }
`;

export const OrderInfo = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  border-radius: 1rem 0;
  background-color: #f8f8f8;
  padding: 1.5rem;
  font-weight: 400;
  span {
    color: ${farmatheme.theme.colors.interactive};
    font-weight: ${({ theme }: { theme: DefaultTheme }) =>
      theme.typography.boldFontWeight};
  }
  ${media.smallScreen`
    font-size: 0.875rem;
    text-align: center;
  `};
`;

export const MailInfo = styled.div`
  color: ${(props) => props.theme.colors.aunaBlack};
  display: flex;
  font-size: ${(props) => props.theme.typography.h4FontSize};
  justify-content: space-between;
  max-width: 24.125rem;
  width: 100%;
  margin-top: 2rem;

  ${media.smallScreen`
    flex-direction: column; 
  `};
`;

export const MailInfoIcon = styled.div`
  display: flex;
  color: #908ba7;
  svg {
    margin: auto;
  }
`;

export const MailInfoText = styled.div`
  line-height: 175%;
  font-size: ${({ theme }: { theme: DefaultTheme }) =>
    theme.typography.baseFontSize};
  font-weight: ${({ theme }: { theme: DefaultTheme }) =>
    theme.typography.normalFontWeight};
  max-width: 20rem;
  ${media.smallScreen`
    font-size: 0.875rem;
    text-align: center;
  `};
`;

export const WrapperDescription = styled.div`
  display: flex;
  padding: 2.5rem 6rem 3.125rem;
  max-width: 38.75rem;
  margin: auto;
  margin-top: 2.5rem;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.white};
  border-radius: 2rem;

  ${media.smallScreen`
    padding: 2.5rem 2rem 3.125rem;
  `};

  > div {
    margin: auto;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

export const Link = styled.a`
  color: ${aunaInteractive};
  cursor: pointer;
  font-size: 14px;
`;

export const IconCard = styled(ReactSVG)`
  svg {
    height: 1.5rem;
    width: 2.5rem;
    image {
      height: 1.5rem;
      width: 2.5rem;
    }
  }
`;

export const WrapperPOS = styled.div`
  min-width: 18.75rem;
  > img {
    width: 2rem;
    height: 2rem;
  }
`;
