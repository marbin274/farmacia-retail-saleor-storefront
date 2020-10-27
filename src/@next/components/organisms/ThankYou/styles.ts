import { styled } from "@styles";

export const Wrapper = styled.div`
  margin: 80px auto;
  max-width: 27rem;
  width: 100%;;
`;

export const ThankYouHeader = styled.p`
  color: ${props => props.theme.colors.interactive};
  font-size: 2.5rem;
  margin: 0;
  line-height: 110%;
  margin-bottom: 3.5rem;
  text-align: center;

  span {
    font-size: ${props => props.theme.typography.ultraBigFontSize};
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const OrderInfo = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  background-color: ${props => props.theme.colors.backgroundLight}; 
  line-height: 170%;
  margin-bottom: 3rem;
  padding: 1rem;
  text-align: center;

  span {
    font-size: ${props => props.theme.typography.baseLineHeight};
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const MailInfo = styled.div`
  color: ${props => props.theme.colors.greyText};
  display: flex;
  font-size: ${props => props.theme.typography.h4FontSize};
  justify-content: space-between;
  line-height: ${props => props.theme.typography.sparseLineHeight};
  margin-bottom: 3rem;
  padding: 1rem;
  text-align: left;
`;

export const MailInfoIcon = styled.div`
  width: 8.5rem;
`;

export const MailInfoText = styled.div`
  font-size: ${props => props.theme.typography.baseFontSize}
  padding-left: 1.5rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ButtonSize = 'sm';