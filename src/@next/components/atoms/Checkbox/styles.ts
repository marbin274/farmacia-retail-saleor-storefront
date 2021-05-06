import { styled } from "@styles";

export const Checkbox = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: -0.25rem;
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
    span {
      background-clip: content-box;
      background-color: ${props => props.theme.colors.primary};
      border: solid 0.125rem ${props => props.theme.colors.primary};
      div {
        display: flex;
      }
    }
  }
`;

export const Span = styled.span<{error: boolean}>`
  border-radius: 0.125rem;
  border: solid 0.188rem ${({ error, theme }) => error ? theme.input.borderColorError : theme.colors.aunaLightGray};
  display: block;
  height: 1.25rem;
  width: 1.25rem;
    div {
      display: none;
      svg {
        fill: ${props => props.theme.colors.white};
      }
  }
`
