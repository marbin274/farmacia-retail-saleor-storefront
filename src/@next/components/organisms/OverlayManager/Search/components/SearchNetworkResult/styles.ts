import { mediaUp, styled } from '@styles';
import { size } from '../../styles';

export const SearchProductsHeader = styled.div`
  ${size}
  max-width: 35.25rem;
`;

export const SearchProductsBody = styled.div`
  height: calc(100% - 2.9rem);
`;

export const SearchProductList = styled.div`
  height: calc(100% - 5rem);
  > ul {
    max-width: 40.3125rem;
  }
`;

export const SearchProductsWrapper = styled.div<{ hasSearchPhrase: boolean }>`
  top: 7.7rem;
  height: calc(100% - 7.7rem);
  ${mediaUp.largeScreen`
    top: 4.7rem;
    height: calc(100% - 4.7rem);
  `}

  ${({ hasSearchPhrase }) =>
    !hasSearchPhrase &&
    `
      opacity: 0.92;
  `}
`;

export const ShowMoreProducts = styled.div`
  border-top-left-radius: 2.1875rem;
  border-top-right-radius: 2.1875rem;
  box-shadow: 0 -0.5rem 1rem rgba(0, 0, 0, 0.08);
  span {
    font-size: 1rem;
    font-weight: 300;
  }
`;
