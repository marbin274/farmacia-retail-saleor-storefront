import { media, styled } from "@styles";
import { white } from "@styles/constants";
import { NavLink as NavLinkComponent } from "@temp/components/NavLink";
import farmatheme from "@farmatheme";

export const Wrapper = styled.nav`
  width: 18rem;
  background-color: ${white};
  padding: 2rem 1rem;
  padding-top: 1.875rem;
  border-radius:16px;

  ${media.largeScreen`
    display: none;
  `}
`;

export const Title = styled.p`
  align-items: flex-start;
  color: ${farmatheme.theme.colors.neutral.darkest};
  display: flex;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 0.813rem 1rem;
`;

export const TitleName = styled.span<{ isLvl1: boolean }>`
  text-transform: capitalize;
  font-size: 1.125rem;
  line-height: 1.75rem;
  ${({ isLvl1 }) => !isLvl1 && `color: ${farmatheme.theme.colors.highlight.medium}`}
  ${({ isLvl1, theme }) => isLvl1 && `font-weight: ${theme.typography.boldFontWeight}`}
`;

export const Link = styled.li`
  margin-bottom: 0.438rem;
  font-weight: 400;
  font-size: 14px;
  coloR: #908BA7;
 

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NavLink = styled(NavLinkComponent)`
  border-radius: 0.5rem;
  padding: 0;
  display: block;
  margin-right: 0;
  font-weight: 500;
  color: ${farmatheme.theme.colors.neutral.darkest};
  padding:17px 16px;
  &:hover {
    color:  ${farmatheme.theme.colors.primary.medium};
    background: ${farmatheme.theme.colors.primary.lightest};

  }

  &:active {
    background:#E8FCF7;
    color:  ${farmatheme.theme.colors.primary.medium};
  }
`;
