import { mediaUp, styled } from '@styles';

export const MobileNavWrapper = styled.div`
  max-width: calc(100vw - 3.5rem);
  width: 30rem;

  ${mediaUp.smallScreen`
    max-width: calc(100vw - 5rem);
  `}
`;
