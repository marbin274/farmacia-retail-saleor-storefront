import { styled } from "@styles";
import { aunaComplementary2, aunaComplementary5, aunaInteractive, neutralDark, white } from "@temp/@next/globalStyles/constants";
import { NavLink as NavLinkComponent } from "@temp/components/NavLink";
import farmatheme from '@farmatheme';

export const NavMenuHeader = styled.li`
    background: ${white};
    border-bottom: 0.0625rem solid ${aunaComplementary5};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    > button {
        transform: scale(.8);
    }
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
    ${({ isCollection, theme }) =>`        
        font-size: ${ theme.typography.smallFontSize};
        font-weight: ${isCollection ? theme.typography.boldFontWeight : "500"};
        line-height: 1.05rem;
        text-transform: capitalize;
        span {
            color: ${isCollection ? `${aunaInteractive}` : farmatheme.theme.colors.highlight.darkest};
        }
    `}
    
`;


