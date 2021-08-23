import farmatheme from '@farmatheme';
import { styled } from '@styles';
import {
  aunaDiscount,
  aunaInteractive,
} from '@temp/@next/globalStyles/constants';
import { NavLink as NavLinkComponent } from '@temp/components/NavLink';

export const NavMenuItem = styled.li`
  div {
    &:hover {
      a {
        color: ${aunaDiscount};
      }
    }
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const NavLink = styled(NavLinkComponent)<{ isCollection: boolean }>`
  ${({ isCollection, theme }) => `        
        font-size: ${theme.typography.smallFontSize};
        font-weight: ${isCollection ? theme.typography.boldFontWeight : '500'};
        line-height: 1.05rem;
        text-transform: capitalize;
        span {
            color: ${
              isCollection
                ? `${aunaInteractive}`
                : farmatheme.theme.colors.highlight.darkest
            };
        }
    `}
`;
