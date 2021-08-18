import { styled } from '@styles';
import { containerWidth } from '@styles/constants';

export const MainHeader = styled.nav`
  max-width: ${containerWidth};
`;

export const ListHamburguer = styled.li`
  button {
    width: 2rem !important;
    height: 2rem !important;
    > span {
      svg {
        transform: translate(0.125rem, 0.1875rem);
      }
    }
  }
`;

export const SearchContainer = styled.div`
  margin-left: 5.625rem;
`;

export const CartItemsQuantity = styled.span`
  margin: auto;
  font-size: 0.625rem;
  line-height: 150%;
  color: white;
`;
