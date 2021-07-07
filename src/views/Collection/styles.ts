import { CollectionStyle, mediaUp } from "@temp/@next/globalStyles";
import styled from "styled-components";

export const CollectionWrapper = styled.div`
  ${CollectionStyle}
  .collection-products {
    width: initial;

    ${mediaUp.largeScreen`
      margin-left: 0;
    `}
  }
`;
