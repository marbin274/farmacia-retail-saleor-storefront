import {  styled } from "@styles";
import { aunaBrand3, aunaBlack } from "@styles/constants";

export const SubtitleDetail = styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: ${aunaBrand3};
  margin-top: 10px;
  margin-bottom: 0.3125rem;
`;

export const LineDetailDelivery = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  span {
    font-weight: 600;
  }
  line-height: 2.125rem;
`;

export const Text = styled.p`
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: 300;
  line-height: 2.125rem;
`;

export const TextBold = styled.span`
  font-weight: 600;
  color: ${aunaBlack};
  font-size: ${({theme}) => theme.typography.smallFontSize};
`;

export const SubTitle = styled.p`
  color: ${aunaBlack};
  margin-bottom: 1rem;
  line-height: 2.125rem;
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: ${({theme}) => theme.typography.normalFontWeight};
`;

