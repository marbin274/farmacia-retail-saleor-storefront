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
`;

export const Text = styled.p`
  color: ${aunaGrey100};
`;
