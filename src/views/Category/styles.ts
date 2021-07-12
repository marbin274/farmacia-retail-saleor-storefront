import { CollectionStyle, DefaultTheme, mediaUp } from "@temp/@next/globalStyles";
import styled from "styled-components";
import farmatheme from "@farmatheme";

export const CategoryWrapper = styled.div`
  ${CollectionStyle}
`;

export const CategoryProductListHeader = styled.div`
  background-color: ${farmatheme.theme.colors.neutral.light};
  padding: 0rem 1rem;
  ${mediaUp.mediumScreen`
    padding: 0rem;
  `}
`;

export const ProductsQuantityWrapper = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  > span {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`;

export const ProductsQuantityLabel = styled.span`
  color: ${({ colors }: DefaultTheme) => colors.greyText};
`;

export const ProductsQuantityValue = styled.span`
  color: ${farmatheme.theme.colors.neutral.darkest};
`;
