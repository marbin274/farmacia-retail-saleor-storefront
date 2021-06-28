import { mediaUp, styled } from "@styles";

export const Container = styled.div`
  height: max-content;
`;

export const Modal = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  padding: 3rem;
  width: 100%;
  ${mediaUp.largeScreen`
      margin: 0 auto;
      width: 30rem;
  `}
`;

export const Icon = styled.div`
  text-align: center;
  width: auto;
  margin-bottom: 1rem;
  svg {
    margin: auto;
    transform: scale(0.8);
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
