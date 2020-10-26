import {DefaultTheme, styled} from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export const Tile = styled.label<{ checked: boolean }>`
  display: block;
  background-color: ${props => props.checked ? props.theme.colors.complementary1 : props.theme.colors.white};
  border: 2px solid  ${props => props.checked ? props.theme.input.borderColorActive : props.theme.input.borderColor};
  cursor: pointer;
  border-radius: 1rem;
  max-width: 34rem;
  padding: 20px;
  width:100%;
`;

export const PaymentLine = styled.span`
  display: inline-flex;
  flex: justify-content;
  position: relative;
  width: calc(100% - 3em);
`;

export const PaymentTitle = styled.span<{ checked: boolean }>`
  color: ${props => props.checked ? props.theme.input.borderColorActive : props.theme.input.labelColor};
  width: 100%;
`;

export const PaymentIcon = styled.span<{ checked: boolean }>`
  color: ${props => props.checked ? props.theme.input.textColor : props.theme.input.labelColor};
  position: absolute;
  right: -1rem;
  top: -1rem;
  width: 3rem;
`;

export const getIconColor= (checked: boolean, theme: DefaultTheme) : string => (
  checked ? theme.input.borderColorActive : theme.input.labelColor
);
