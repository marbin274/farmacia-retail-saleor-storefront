import { mediaUp, styled } from '@styles';
import {
  aunaInteractive,
  baseFontColor,
} from '@temp/@next/globalStyles/constants';

export const ListItem = styled.li<{ active?: boolean }>`
  line-height: 1.5rem;

  ${mediaUp.smallScreen`
    line-height: normal;
  `};

  span {
    color: #2f2c3a;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5rem;
    text-decoration: none;
    text-transform: capitalize;
  }

  ${({ active }) =>
    active &&
    `
    span {
      color: ${baseFontColor};
    }
  `}
`;

export const LinkMobile = styled.span`
  color: ${aunaInteractive};
`;
