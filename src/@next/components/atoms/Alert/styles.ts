import { media, styled } from "@styles";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  z-index: 1000;
  padding: 24px;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.white};
  border-radius: 16px;
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
  width: 60%;
  margin: 0 auto;
`;

export const Title = styled.div`
  text-align: center;
  width: 60%;
  margin: 0 auto;
  font-weight: ${props => props.theme.typography.normalFontWeight};
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-bottom: 1rem;
`;

export const Message = styled.div`
  text-align: center;
  font-weight: ${props => props.theme.typography.smallFontWeight};
  font-size: ${props => props.theme.typography.smallFontSize};
  width: 60%;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

export const Footer = styled.div`
  width: 100%;
  text-align: center;
  width: 60%;
  margin: 0 auto;

  button {
    width: 100%;
  }
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
