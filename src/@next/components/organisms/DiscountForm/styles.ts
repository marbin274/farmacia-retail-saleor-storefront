import { media, styled } from "@styles";

export const DiscountForm = styled.form`
  .promoCode {
    margin-top: 1rem;
    div:nth-child(1){
      padding: 0;
      span:nth-child(1) {
        margin-right: 5rem;
      }
    }
    button {
      margin-top: -1.4rem;
      cursor: pointer;
      background: ${props => props.theme.colors.aunaBlackGray}; 
      border-radius: %;
      padding: 0px 5px 0px 5px;
        &:active {
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          background: transparent;
        }
      svg {
        width: 12px;
        padding-top: 5px;
        path {
          fill: ${props => props.theme.colors.white}; 
        }
      }
    }
  }
  .voucherTitle{
    display: flex;
    span{
      margin-left: 1rem;
      color: ${props => props.theme.colors.aunaOrange};
      font-size: ${props => props.theme.typography.bigFontSize};
      font-weight: ${props => props.theme.typography.normalFontWeight};
      margin-right: 1rem;
      padding-top: 2.5px;
    }
  }
  .voucherDescription {
    font-size: ${props => props.theme.typography.smallFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
    color: ${props => props.theme.colors.aunaOrange};
  }

  ${media.smallScreen`
    .promoCode {
      button {
        float: right;
        margin-top: -3rem;
      }
    }
  `}
`;

export const Input = styled.div`
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const InputWithButton = styled.div`
  display: flex;
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const ButtonWrapper = styled.div`
  width: auto;
  min-width: 110px;
  button {
    padding: 0.8rem 1rem;
  }
`;

export const ChipsWrapper = styled.div`
  margin: 0.4rem 0 0 0;
`;