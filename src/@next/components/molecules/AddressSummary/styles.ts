import { styled } from "@styles";
import { aunaBlack, aunaGrey100 } from "@styles/constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.6;
`;

export const Title = styled.p`
  color: ${aunaBlack};
  display: inline-block;
  font-size: ${({theme}) => theme.typography.smallFontSize};
  font-weight: ${({theme}) => theme.typography.normalFontWeight};
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  color: ${aunaGrey100};
`;
