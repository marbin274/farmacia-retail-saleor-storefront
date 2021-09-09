import { mediaUp, styled } from '@styles';
import {
  aunaInteractive,
  baseFontColor,
} from '@temp/@next/globalStyles/constants';
import { Link } from 'react-router-dom';

export const ListItem = styled.li<{ active?: boolean }>`
  line-height: 1.5rem;

  ${mediaUp.smallScreen`
    line-height: normal;
  `};

  a {
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
    a {
      color: ${baseFontColor};
    }
  `}
`;

export const LinkMobile = styled(Link)`
  color: ${aunaInteractive};
`;
