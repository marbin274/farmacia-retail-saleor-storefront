import { media, styled } from "@styles";

export const PaymentForm = styled.form`
  max-width: 27rem;
  padding-left: 2rem;
  width: 100%;
  
  ${media.smallScreen`
      padding-left: 0;
  `}
`;

export const PaymentInput = styled.div`
  width: 100%;
  padding: 1.5rem 0;
`;
PaymentInput.displayName = "S.PaymentInput";

export const PaymentInputExp = styled.div`
  max-width: 16rem;
  padding: 1.5rem 0 0 0;
`;

export const PaymentInputCsc = styled.div`
  max-width: 10rem;
  padding: 1.5rem 1rem 0 1.5rem;
`;

export const Grid = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    padding-right: ${props => props.theme.spacing.spacer};
    &:last-child {
      padding-right: 0;
    }
    ${media.smallScreen`
      padding-right:  0;
      
    `}
  }
`;
