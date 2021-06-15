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
  font-weight: 600;
  font-size: 16px;
  color: ${farmatheme.theme.colors.neutral.darkest};
  margin: 0 0 0.813rem 1rem;
`;

export const TitleIcon = styled.span`
  align-items: center;
  display: flex;
  margin-right: .5rem;
`;

export const TitleName = styled.span<{ isLvl1: boolean }>`
  text-transform: capitalize;
  ${({ isLvl1, theme }) => !isLvl1 && `color: ${theme.colors.interactive}`}
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
color: ${({ theme }) => theme.colors.greyText};
  border-radius: 0.3125rem;
  padding: 0;
  display: block;
  margin-right: 0;
  color: ${({ theme }) => theme.colors.greyText};
  padding:17px 16px;

  &:hover {
    color: ${({ theme }) => theme.colors.interactive};
    background:#E8FCF7;
    
  }

  &:active {
    background:#E8FCF7;
    color: ${({ theme }) => theme.colors.interactive};
  }
`;
