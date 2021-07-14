import { styled, media } from "@styles";

export const ProductSticker = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  z-index: 1;

  ${media.smallScreen`
    top: -0.3125rem;
    left: -1.875rem;
  `}
`;
