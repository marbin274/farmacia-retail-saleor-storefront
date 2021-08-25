import { mediaUp, styled } from '@styles';

export const MobileNavWrapper = styled.div`
  max-width: calc(100vw - 3.5rem);
  width: 30rem;

  ${mediaUp.smallScreen`
    max-width: calc(100vw - 5rem);
  `}
`;

export const ContactNavWrapper = styled.div`
  padding: 2.125rem 0 0 2.625rem;
`;

export const ContactPhoneWrapper = styled.div`
  margin-top: 1.875rem;

  padding-left: 2.625rem;
  img {
    width: 1.5625rem;
    height: 1.5625rem;
    margin: -0.3125rem 0.625rem 0 0;
  }
  span {
    padding: 2.125rem 0 2.5rem;
  }
`;
