import { media, styled } from "@styles";
import { turquoise } from '@styles/constants';



export const DiscountForm = styled.form`
  .promoCode {
    padding: 1.25rem;
    margin-top: 1rem;
    div:nth-child(1){
      padding: 0;
      span:nth-child(1) {
        margin-right: 5rem;
      }
    }
    button {
      margin-top: -1.4rem;
      background: ${props => props.theme.colors.aunaBlackGray}; 
      border-radius: %;
      padding: 0px 5px 0px 5px;
        &:active {
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          background: transparent;
        }
        &:disabled {
          cursor: not-allowed;
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
    margin-left: -3px;
    span{
      margin-left: 1rem;
      color: ${props => props.theme.colors.aunaBlack};
      font-size: ${props => props.theme.typography.smallFontSize};
      font-weight: ${props => props.theme.typography.normalFontWeight};
      margin-right: 1rem;
      
      font-weight: 600;
    }
  }
  .voucherDescription {
    margin-left: 35px;
    font-size: ${props => props.theme.typography.labelFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
    color: ${props => props.theme.colors.aunaBlack};
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
  padding: 1.25rem;
  width: 328px;
  height: 7rem;
  background: #F6F8FA;
  border-radius: 1rem;
  ${media.smallScreen`
    width: 100%;
    padding-left: 1.875rem;
  `}
  `;
export const LinkWrapper = styled.span`
  margin-top: 0.9375rem;
  color: ${turquoise};
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
`;
