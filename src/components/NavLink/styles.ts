import { styled } from "@styles";
import { turquoise } from '@styles/constants';

export const NavActive= styled.span<{isActive: boolean}>`
  color: ${ props => props.isActive ? turquoise : null};
`;

