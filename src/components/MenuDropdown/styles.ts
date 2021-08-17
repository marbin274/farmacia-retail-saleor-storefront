import { styled } from '@styles';
import { turquoise } from '@temp/@next/globalStyles/constants';

export const MenuDropwdownBody = styled.div`
  box-shadow: 0 0.4375rem 0.9375rem rgba(0, 0, 0, 0.25);

  &.rightdown {
    right: 0 !important;
    left: 1rem !important;
  }

  ul {
    display: flex;
    flex-direction: column;
    font-style: normal;
    font-weight: normal;

    line-height: 2rem;
    align-items: flex-start;

    li {
      width: 80%;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      margin: auto;
      &:hover {
        color: ${turquoise};
      }
    }
  }
`;
