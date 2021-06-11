import { styled, media } from "@styles";
import farmatheme from "@farmatheme";

export const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 21.25rem;
  padding: 1.5rem;
  margin: auto;

  ${media.xSmallScreen`
    max-width: 18.75rem;
  `}
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const Title = styled.div`
  padding-top: 0.5rem;
  text-align: center;
  width: 100%;
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;

export const CurrentDistrict = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${farmatheme.theme.colors.highlight.medium};
  svg {
    margin-right: 1rem;
  }
`;

export const ProductsWrapper = styled.div<{ allOutOfStock: boolean }>`
  background-color: ${farmatheme.theme.colors.neutral.light};
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  max-height: ${props => (props.allOutOfStock ? 21.25 : 16)}rem;
  overflow: hidden;
  overflow-y: scroll;
`;

export const ProductItem = styled.div`
  border-bottom: 1px solid ${farmatheme.theme.colors.neutral.medium};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:last-child {
    border-bottom: 1px solid transparent;
  }
`;

export const ProductItemTop = styled.div`
  display: flex;
`;

export const ProductInfo = styled.div`
  width: calc(100% - 5.25rem);
`;

export const ProductImage = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  > span {
    text-align: center;
  }
`;

export const ImageBox = styled.div`
  width: 4.25rem;
  height: 4.25rem;
  display: flex;
  background-color: ${farmatheme.theme.colors.neutral.lightest};
  border: 0.0625rem solid ${farmatheme.theme.colors.neutral.medium};
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  img {
    height: 3.5rem;
    max-width: 2.25rem;
    margin: auto;
  }
`;

export const ProductName = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.625rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: ${farmatheme.theme.colors.neutral.darkest};
`;

export const ProductNumerics = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: 0.875rem;
  color: ${farmatheme.theme.colors.primary.medium};
`;

export const Quantity = styled.span`
  color: ${farmatheme.theme.colors.error.medium};
`;

export const NoStock = styled.span`
  background-color: ${props => props.theme.colors.aunaBrand5};
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
`;

export const StockMessage = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 1rem;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;

  span {
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: ${farmatheme.theme.colors.neutral.darkest};
    span:last-child {
      color: ${farmatheme.theme.colors.error.medium};
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 0.25rem;
  p {
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.375rem;
    margin-bottom: 1.5rem;
  }

  button {
    margin-bottom: 1rem;
  }
`;
