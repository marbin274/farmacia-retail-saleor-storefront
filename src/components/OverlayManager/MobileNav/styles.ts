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
  padding: 2.125rem 0;

  span {
    padding: 2.125rem 0 2.5rem 2.625rem;
    &:before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 1.5625rem;
      height: 1.5625rem;
      margin: -0.3125rem 0.625rem 0 0;
      background: url('../../../../images/contact-phone.svg') no-repeat;
    }
  }
`;
