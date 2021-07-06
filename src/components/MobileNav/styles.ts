import { styled } from "@styles";
import { aunaInteractive, highlightDarkest, neutralDark } from "@temp/@next/globalStyles/constants";
import { NavLink as NavLinkComponent } from "@temp/components/NavLink";

export const categoriesLabel = styled.li`
    color: ${neutralDark};
    padding: 1.25rem 1.5rem 0.25rem 1.5rem;
    text-transform: uppercase;
`;

export const NavLink = styled(NavLinkComponent) <{ isCollection: boolean }>`
    color: ${({ isCollection }) => isCollection ? aunaInteractive : highlightDarkest}
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    font-weight: 500;
    line-height: 1.05rem;
    text-transform: capitalize;
`;


