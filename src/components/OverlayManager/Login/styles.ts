import { mediaUp, styled } from '@styles';
import { neutralDarkest, white } from '@temp/@next/globalStyles/constants';
import { Overlay } from '@temp/components';

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
      padding: 0 6.75rem 0 8.75rem;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 41.25rem;
    `}
  }
`;

export const ScrollWrapper = styled.div`
  padding: 3.2rem 0 7.5rem 0;

  ${mediaUp.smallScreen`
  padding: 3.2rem 0 3.2rem 0;
`}
`;

export const OverlayHeaderWrapper = styled.div`
  border: 0 !important;
  padding: 0 !important;
  align-items: inherit !important;
  display: block !important;
  p {
    margin-bottom: 0.5rem;
    ${mediaUp.smallScreen`
      margin-bottom: 1rem;
    `}

    &:first-child {
      margin-bottom: 1rem;
      text-align: left;
    }
  }
`;

export const LoginContent = styled.div`
  max-height: 65vh;

  label {
    color: ${neutralDarkest};
    font-size: 0.875rem;
    font-weight: 500;
  }
`;
