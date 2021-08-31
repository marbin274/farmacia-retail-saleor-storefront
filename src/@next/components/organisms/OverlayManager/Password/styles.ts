import { Overlay } from '@components/organisms/OverlayComponent';
import { mediaUp, styled } from '@styles';
import { white } from '@temp/@next/globalStyles/constants';

export const OverlayWrapper = styled(Overlay)`
  .overlay__center {
    background-color: ${white};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
    bottom: 0;
    height: auto;
    left: 0;
    max-height: 100vh;
    padding: 0 1rem 0 1rem;
    top: auto;
    transform: none;
    width: 100%;

    ${mediaUp.smallScreen`
      border-radius: 2.5rem;
      bottom: initial;
      left: 50%;
      padding: 0 7.75rem 0 7.75rem;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 41.25rem;
    `}
  }
`;

export const PasswordResetWrapper = styled.div`
  padding: 3.2rem 0 3.2rem 0;
`;
