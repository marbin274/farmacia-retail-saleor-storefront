import {  styled } from "@styles";
import { aunaBrand3 } from "@styles/constants";

export const SubtitleDetail = styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: ${aunaBrand3};
`;

export const LineDetailDelivery = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  span {
    font-weight: 600;
  }
  line-height: 2.125rem;
`;
