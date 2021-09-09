import { styled } from '@styles';
import { css } from 'styled-components';

export const customBreakpoint = '624px';

export const SearchMessage = styled.div`
  height: calc(100vh - 9.625rem);
`;

export const size = css`
  margin: 0 auto;
  max-width: 20.625rem;
  width: 100%;

  @media (min-width: ${customBreakpoint}) {
    max-width: 34.5rem;
  }
`;
