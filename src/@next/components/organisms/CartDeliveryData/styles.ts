import { media, styled } from "@styles";
import { aunaBrand3, aunaBlack } from "@styles/constants";

export const SubtitleDetail = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${aunaBrand3};
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 2rem;
`;

export const LineDetailDelivery = styled.div<{ direction: string }>`
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-bottom: 1rem;
  display: flex;
  flex-direction: ${(props: { direction: string }) => props.direction};
  span {
    flex-grow: 1;
    flex-basis: 0;

    line-height: 1rem;
  }

  ${({ direction }) =>
    direction === "column" &&
    `
  span:nth-child(2) {
    margin-top: 0.5rem;
  }
  `}
  ${media.smallScreen`
    flex-direction: column;
    span:nth-child(2) {
      margin-top: 0.5rem;
    }
  `};
`;

export const LineDetailDeliveryLabel = styled.span`
  color: #908ba7;
`;

export const LineDetailDeliveryValue = styled.span`
  color: #23212b;
  font-weight: 600;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: 400;
  line-height: 2.125rem;
`;

export const TextBold = styled.span`
  font-weight: 600;
  color: ${aunaBlack};
  font-size: ${({ theme }) => theme.typography.smallFontSize};
`;

export const SubTitle = styled.p`
  color: ${aunaBlack};
  margin-bottom: 1rem;
  line-height: 2.125rem;
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: ${({ theme }) => theme.typography.normalFontWeight};
`;
