import { styled } from "@styles";
import farmatheme from "@farmatheme";

export const Checkbox = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: 0.25rem;
  font-size:14px;
  color:#23212B;
  font-weight:500;
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
  .checkout_icon {
    color: red;
  }
  input:checked + div {
    background-color: ${farmatheme.theme.colors.interactive};
    border-radius: 0.25rem;
    overflow: hidden;
    span {
      padding: 0.25rem 0.25rem 0.25rem 0.125rem;
      background-clip: content-box;
      div {
        display: flex;
      }
    }
  }
`;

export const Span = styled.span<{error: boolean}>`
  border-radius: 0.125rem;
  border: solid 0.188rem ${({ error, theme }) => error ? theme.input.borderColorError : theme.colors.aunaLightGray};
  border: 1px solid ${farmatheme.theme.colors.interactive};
  display: block;
  height: 1.25rem;
  width: 1.25rem;
  svg {
    fill: ${props => props.theme.colors.white};
  }
`
