import { styled } from "@styles";

export const Checkbox = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: -4px;
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  padding-right: 1rem;
  input[type="checkbox"] {
    display: none;
    position: relative;
    right: -999em;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 26px;
    width: 26px;
    span {
      width: 20px;
      height: 20px;
      display: inline-block;
      border-radius: 2px;
      border: solid 3px ${props => props.theme.colors.aunaLightGray};
      div {
        display: none;
        svg {
          fill: ${props => props.theme.colors.white};
        }
      }
    }
    ${Checkbox}:hover & {
    }
    :focus {
      outline: none;
    }
  }
  .checkout_icon {
    color: red;
  }
  input:checked + div {
    span {
      background-clip: content-box;
      background-color: ${props => props.theme.colors.primary};
      border: solid 2px ${props => props.theme.colors.primary};
      div {
        display: block;
        position: absolute;
        left: 3px;
        bottom: 2px;
        top: 2.5px;
      }
    }
  }
`;
