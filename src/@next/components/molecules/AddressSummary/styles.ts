import { styled } from "@styles";
import { aunaBlack } from "@styles/constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: 300;
  line-height: 1.6;
`;

export const Title = styled.p`
  color: ${aunaBlack};
  display: inline-block;
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: ${({theme}) => theme.typography.boldFontWeight};
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  color: ${aunaBlack};
  line-height: 1.875rem;
`;

export const TextBold = styled.span`
  font-weight: ${({theme}) => theme.typography.boldFontWeight};
`;
