import { styled } from "@styles";
import { aunaComplementary2, aunaComplementary5, aunaInteractive, highlightDarkest, neutralDark } from "@temp/@next/globalStyles/constants";
import { NavLink as NavLinkComponent } from "@temp/components/NavLink";

export const NavMenuHeader = styled.li`
    border-bottom: 0.0625rem solid ${aunaComplementary5};
    padding: 1.5rem;
`;

export const CategoriesLabel = styled.li`
    color: ${neutralDark};
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    padding: 1.25rem 1.5rem 0.25rem 1.5rem;
    text-transform: uppercase;
`;


export const CollectionNav = styled.ul`
    background-color: ${aunaComplementary2};
    box-shadow: 0rem 0.3125rem 0.375rem rgb(0 0 0 / 14%);
    position: relative;
`;

export const NavLink = styled(NavLinkComponent) <{ isCollection: boolean }>`
    color: ${({ isCollection }) => isCollection ? aunaInteractive : highlightDarkest};
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    font-weight: 500;
    line-height: 1.05rem;
    text-transform: capitalize;
`;


