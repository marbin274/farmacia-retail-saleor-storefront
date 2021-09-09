import { styled } from '@styles';
import { turquoiseDark } from '@styles/constants';
import { ReactSVG } from 'react-svg';

export const Wrapper = styled.div`
  box-shadow: 0 0.375rem 0.9375rem 0.1875rem rgba(0, 0, 0, 0.25);
  border-left: 0.3rem solid ${turquoiseDark};
`;

export const CloseIcon = styled(ReactSVG)`
  position: absolute;
  top: 1.8rem;
  right: 1.5rem;
  transition: 0.3s;

  svg * {
    transition: 0.3s;
  }

  &:hover {
    svg * {
      fill: $gray;
    }
  }
`;
