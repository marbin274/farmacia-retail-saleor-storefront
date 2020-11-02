import { media, styled } from "@styles";
import { aunaInteractive, aunaBlack, aunaGrey100 } from "@styles/constants";

export const Wrapper = styled.div``;

export const Grid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  ${media.smallScreen`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const ErrorMessages = styled.div`
  margin-top: 30px;
`;

export const Title = styled.h4`
  color: ${aunaInteractive};
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 16px;
  `;

export const Text = styled.p`
  color: ${aunaGrey100};
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
`;

export const ImportantText = styled(Text)`
  color: ${aunaBlack};
`;
