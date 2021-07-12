import { CollectionStyle, mediaUp } from "@temp/@next/globalStyles";
import styled from "styled-components";

export const CollectionWrapper = styled.div`
  ${CollectionStyle}
  .collection-products {
    width: 100%;

    ${mediaUp.largeScreen`
      margin-left: 0;
    `}
  }
`;

export const HeaderProducts = styled.div`
  z-index: 1;
`;
