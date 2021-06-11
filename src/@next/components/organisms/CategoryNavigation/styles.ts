import { media, styled } from "@styles";
import { white } from "@styles/constants";
import { NavLink as NavLinkComponent } from "@temp/components/NavLink";

export const Wrapper = styled.nav`
  width: 18.75rem;
  background-color: ${white};
  padding: 1.25rem 1rem;
  padding-top: 1.875rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  ${media.largeScreen`
    display: none;
  `}
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 1rem;  
  font-size: ${({ theme }) => theme.typography.bigFontSize};
`;

export const TitleIcon = styled.span`
  align-items: center;
  display: flex;
  margin-right: .5rem;
`;

export const TitleName = styled.span<{ isLvl1: boolean }>`
  ${({ isLvl1, theme }) => !isLvl1 && `color: ${theme.colors.interactive}`}
  ${({ isLvl1, theme }) => isLvl1 && `font-weight: ${theme.typography.boldFontWeight}`}
`;

export const Link = styled.li`
  margin-bottom: 0.25rem;
  font-weight: normal;
  font-size: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NavLink = styled(NavLinkComponent)`
color: ${({ theme }) => theme.colors.greyText};
  border-radius: 0.3125rem;
  display: block;
  margin-right: 0.625rem;
  padding: 1rem 0.5rem;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.complementary1};
    color: ${({ theme }) => theme.colors.interactive};
  }
`;
