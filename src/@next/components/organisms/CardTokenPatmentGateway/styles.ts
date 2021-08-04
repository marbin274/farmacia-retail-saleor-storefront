import { styled, media } from "@styles";

export const Content = styled.div`
  height: 30rem;

  ${media.xSmallScreen`
    height: 20rem;
  `}
`;
