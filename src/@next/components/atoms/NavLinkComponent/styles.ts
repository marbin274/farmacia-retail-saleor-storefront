import { styled } from '@styles';
import farmatheme from '@farmatheme';

export const NavActive = styled.span<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? farmatheme.theme.colors.highlight.darkest : null};
`;
