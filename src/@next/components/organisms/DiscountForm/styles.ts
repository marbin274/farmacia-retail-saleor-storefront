import { media, styled } from "@styles";
import farmatheme from "@farmatheme";

export const DiscountForm = styled.form``;

export const InputWithButton = styled.div`
  display: flex;
  width: 26.375rem;
  align-items: flex-end;
  ${media.largeScreen`
    flex: auto;
  `}

  ${media.smallScreen`
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    align-items: flex-start;
  `}

  button {
    > span {
      font-weight: 600;
      margin-left: 0;
    }
    ${media.smallScreen`
      margin-top: 1rem;
    `}
  }
`;

export const InputWrapper = styled.div`
  width: calc(100% - 7rem);
  margin-right: 1.3125rem;
  > div {
    > label {
      font-weight: 600;
    }
  }
  ${media.smallScreen`
    width: 100%;
    max-width: 19.375rem;
  `}
`;

export const ChipsWrapper = styled.div`
  background: #ffffff;
  border: 0.09375rem solid #00bf8e !important;
  border-radius: 1rem;
  width: 23.75rem;
  min-height: 7.5rem;
  padding: 1.125rem 2rem;

  ${media.smallScreen`
    width: 100%;
    max-width: 21.875rem;
  `}

  .voucherTitle {
    display: flex;
    align-items: center;
    margin-left: -0.25rem;
    svg {
      path {
        fill: #00bf8e;
      }
    }

    > span {
      margin-left: 1rem;
      color: #23212b;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
  .voucherDescription {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.5rem;
    margin-left: 2.1875rem;
    padding-bottom: 0.375rem;
    > span {
      font-weight: 600;
      color: #00bf8e;
    }
  }
`;
export const LinkWrapper = styled.span`
  margin-top: 0.9375rem;
  color: ${farmatheme.theme.colors.interactive};
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-left: 2.125rem;
  font-weight: 500;
`;
