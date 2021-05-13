import { styled, mediaUp, media } from "@styles";
import { aunaInteractive, white } from "@styles/constants";
import { Button } from "@components/atoms";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: 0.5rem;
  padding: 1.25rem;
`;

export const WrapperDescription = styled.div`
  display: flex;
  flex-direction: column;
  
  ${mediaUp.mediumScreen`
    flex-direction: row;
  `};
  justify-content: space-between;
  margin-bottom: 2.50rem;
  margin-top: 2.50rem;
  > :nth-child(2){
    width: 100%;
    ${mediaUp.mediumScreen`
      width: 22.6875rem;
  `};
    height: 17rem;
  }
`;
export const ThankYouHeader = styled.p`
  color: ${props => props.theme.colors.aunaBrand3};
  font-size: 1.5rem;
  margin: 0;
  line-height: 150%;
  margin-bottom: 1.5rem;
  text-align: center;

  span {
    font-size: ${props => props.theme.typography.ultraBigFontSize};
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const OrderInfo = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  background-color: ${props => props.theme.colors.white};
  line-height: 170%;
  margin-bottom: 1.25rem;
  padding: 1.5rem;
  width: 100%;
  ${mediaUp.mediumScreen`
    width: 26.75rem;
  `}
  text-align: center;
  border-radius: 16px;
  span {
    font-size: ${props => props.theme.typography.baseLineHeight};
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;

export const MailInfo = styled.div`
  color: ${props => props.theme.colors.aunaBlack};
  display: flex;
  font-size: ${props => props.theme.typography.h4FontSize};
  justify-content: space-between;
  line-height: ${props => props.theme.typography.sparseLineHeight};
  padding: 1rem;
  text-align: left;
  ${mediaUp.mediumScreen`
    width: 26.75rem;
  `};
  ${media.smallScreen`
    align-items: center;
    flex-direction: column;
  `};
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
`;

export const Link = styled.a`
  color: ${aunaInteractive};
  cursor: pointer;
  font-size: 14px;
`;

export const SecondaryButton = styled(Button)`
  background-color: ${white};
  border: 1px solid ${aunaInteractive} !important;
  color: ${aunaInteractive} !important;
  height: 48px;
  padding: 0;
  width: 226px;

  > span {
    font-size: 16px;
  }
`;
