import { media, styled } from "@styles";
import { white } from "@styles/constants";
import { NavLink as NavLinkComponent } from "@temp/components/NavLink";

export const Wrapper = styled.nav`
  width: 18.75rem;
  background-color: ${white};
  padding: 1.25rem 2rem;
  padding-top: 1.875rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  ${media.largeScreen`
    display: none;
  `}
`;

export const Title = styled.p`
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 14px;
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
  border-radius: 0.3125rem;
  padding: 1.2rem 0;
  display: block;
  margin-right: 0.625rem;
  color: ${({ theme }) => theme.colors.greyText};

  &:hover {
    color: ${({ theme }) => theme.colors.interactive};
  }
`;
