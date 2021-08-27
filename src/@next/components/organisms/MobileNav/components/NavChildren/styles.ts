import { styled } from '@styles';
import { aunaInteractive } from '@temp/@next/globalStyles/constants';
import { keyframes } from 'styled-components';

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NavChildrenWrapper = styled.ul`
  animation: ${show} 360ms ease-in-out 0s 1 alternate forwards;

  > .child {
    color: #908ba7;
    &:active,
    &:hover {
      color: ${aunaInteractive};
    }
  }
`;
