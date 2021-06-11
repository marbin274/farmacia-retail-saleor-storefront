import { media, styled } from "@styles";
import { boldFontWeight, h3FontSize } from "@temp/@next/globalStyles/constants";

export const Wrapper = styled.div`
  ${media.smallScreen`
    padding: 0.9375rem;
  `}
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 0.0625rem solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin: 1.875rem 0;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const DiscountField = styled.div`
  margin-bottom: 1.875rem;
  form {
    .flex {
      border: solid ${props => props.theme.colors.aunaLightGray} 0.0625rem;
      display: flex;
      box-sizing: border-box;
      border-radius: 0.25rem;
    }
    .error {
      border: solid ${props => props.theme.colors.aunaError} 0.0625rem;
      display: flex;
      box-sizing: border-box;
      border-radius: 0.25rem;
      .button {
        button {
          color: ${props => props.theme.colors.aunaDisabled};
        }
      }
    }
    div {
      border: none;
      outline: none;
      margin-bottom: 0;
    }
    .input {
      width: 87%;
      float: left;
      padding: 0rem;
      input {
        font-weight: $font-weight-normal;
        font-size: $small-font-size;
        color: $auna-black;
        &::placeholder {
          text-transform: none;
        }
      }
    }
    .button {
      button {
        color: ${props => props.theme.colors.primary};
        background: transparent;
        padding: 0.8rem 1.4rem 0.7rem 1.3rem;
        margin-right: 0;
        float: right;
        border-radius: 0;
        outline: none;

        &:hover {
          background: transparent;
        }

        &:active {
          background: transparent !important;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }

        &:disabled {
          background: transparent;
        }

        span {
          font-weight: ${props => props.theme.typography.normalFontWeight};
          font-size: ${props => props.theme.typography.smallFontSize};
        }

        &:focus {
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
      }
    }
  }
  ${media.smallScreen`
      margin-bottom: 1.875rem;
  `}
`;

export const Tile = styled.label<{ checked: boolean }>`
  display: block;
  background-color: ${props => props.theme.colors.light};
  padding: 1.25rem;
  ${props => props.checked && `border: 0.125rem solid #21125E;`}
  font-size: ${props => props.theme.typography.smallFontSize};
  cursor: pointer;
`;

export const CuponWraper = styled.div`
  margin-bottom: 1.5rem;
`;
export const CuponLabel = styled.span`
  font-weight: ${boldFontWeight};
  font-size: ${h3FontSize};
  line-height: ${h3FontSize};
`;
