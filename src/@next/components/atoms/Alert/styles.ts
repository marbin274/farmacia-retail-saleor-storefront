import { media, styled } from "@styles";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  z-index: 1000;
  padding: 3rem;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

  ${media.smallScreen`
    width: 90%;
    margin-left: 5%;
  `}
`;

export const Icon = styled.div`
  text-align: center;
  width: auto;
  svg {
    margin: auto;
    transform: scale(1.5);
    height: 2rem;
    path {
      fill: #00bf8e;
    }
  }
`;

export const Title = styled.div`
  text-align: center;
  margin: 0 auto;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.baseLineHeight};
  line-height: ${props => props.theme.typography.h3FontSize};
  margin-bottom: 1rem;
  color: #23212b;
`;

export const Message = styled.div`
  text-align: center;
  font-weight: ${props => props.theme.typography.normalFontWeight};
  font-size: ${props => props.theme.typography.smallFontSize};
  line-height: ${props => props.theme.typography.baseLineHeight};
  margin: 0 auto;
  margin-bottom: 1.5rem;
  color: #23212b;
`;

export const Footer = styled.div`
  width: 100%;
  text-align: center;
  width: 60%;
  margin: 0 auto;

  button {
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.h3FontSize};
    font-weight: ${props => props.theme.typography.boldFontWeight};

    span {
      margin-left: 0;
    }
  }
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
