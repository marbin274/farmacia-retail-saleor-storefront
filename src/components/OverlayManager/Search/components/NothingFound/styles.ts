import { styled } from '@styles';
import { customBreakpoint } from '../../styles';

export const NotFoundMessage = styled.div`
  max-width: 20.625rem;

  @media (min-width: ${customBreakpoint}) {
    max-width: 34.5rem;
  }
`;
