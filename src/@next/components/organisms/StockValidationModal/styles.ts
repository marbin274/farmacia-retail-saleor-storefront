import { styled, media } from "@styles";

export const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  padding: 1.5rem;

  ${media.smallScreen`
    margin: 1rem;
  `}

  ${media.xSmallScreen`
    margin: 6rem 1rem 1rem 1rem;
  `}
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
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

  img {
    margin-right: 0.25rem;
  }
`;

export const CloseIcon = styled.div`
  text-align: center;
`;

export const ProductsWrapper = styled.div<{ allOutOfStock: boolean }>`
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  max-height: ${props => (props.allOutOfStock ? 21.25 : 16)}rem;
  overflow: hidden;
  overflow-y: scroll;
`;

export const ProductItem = styled.div`
  border-bottom: ${props => `1px solid ${props.theme.colors.aunaLightGray}`};
  padding-top: 1rem;
  padding-bottom: 1rem;

  &:last-child {
    border-bottom: 1px solid transparent;
  }
`;

export const ProductItemTop = styled.div`
  display: flex;
`;

export const ProductInfo = styled.div`
  width: 100%;
`;

export const ProductImage = styled.div`
  width: min-content;
  margin-right: 0.5rem;

  img {
    height: auto;
    max-width: 3.75rem;
  }
`;

export const ProductName = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const ProductNumerics = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: 0.875rem;
`;

export const Quantity = styled.span`
  color: ${props => props.theme.colors.aunaError};
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
  font-size: 0.75rem;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-top: 0.5rem;

  span {
    span:first-child {
      font-weight: ${props => props.theme.typography.boldFontWeight};
    }

    span:last-child {
      font-weight: ${props => props.theme.typography.boldFontWeight};
      color: ${props => props.theme.colors.aunaError};
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  button {
    width: 18rem;
    margin-bottom: 1rem;
  }

  ${media.smallScreen`
    button {
      width: 100%;
    }
  `}
`;
