import { media, styled } from '@styles';
import { white } from '@styles/constants';
import { NavLink as NavLinkComponent } from '@components/atoms/NavLinkComponent';
import farmatheme from '@farmatheme';

export const Wrapper = styled.nav`
  background-color: ${white};
  border-radius: 16px;
  padding: 1.875rem 1rem 2rem;
  width: 18rem;

  ${media.largeScreen`
    display: none;
  `}
`;

export const Title = styled.span`
  align-items: flex-start;
  color: ${farmatheme.theme.colors.neutral.darkest};
  display: flex;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 0.813rem 1rem;
`;

export const TitleName = styled.span`
  color: ${farmatheme.theme.colors.highlight.medium};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  text-transform: capitalize;
`;

export const Link = styled.li`
  color: #908ba7;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0.438rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NavLink = styled(NavLinkComponent)<{ isActive: boolean }>`
  border-radius: 0.5rem;
  color: ${farmatheme.theme.colors.neutral.darkest};
  display: block;
  font-weight: 500;
  margin-right: 0;
  padding: 1.0625rem 1rem;

  &:active {
    background: ${farmatheme.theme.colors.primary.lightest};
    color: ${farmatheme.theme.colors.primary.medium};
  }

  &:hover {
    background: ${farmatheme.theme.colors.primary.lightest};
    color: ${farmatheme.theme.colors.primary.medium};
    > span {
      color: ${farmatheme.theme.colors.primary.medium};
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
      background: ${farmatheme.theme.colors.primary.lightest};
      color: ${farmatheme.theme.colors.primary.medium};
      > span {
        color: ${farmatheme.theme.colors.primary.medium};
      }
    `}
`;
