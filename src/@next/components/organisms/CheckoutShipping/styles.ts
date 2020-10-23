import { styled } from "@styles";

export const ShippingMethodForm = styled.form`
  display: grid;
  grid-gap: 20px;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const Tile = styled.label<{ checked: boolean }>`
  background-color: ${props => props.checked ? props.theme.colors.complementary1 : props.theme.colors.white};
  border: 2px solid  ${props => props.checked ? props.theme.input.borderColorActive : props.theme.input.borderColor};
  border-radius: 1rem;
  display: block;
  font-size: ${props => props.theme.typography.smallFontSize};
  cursor: pointer;
  padding: 20px;
`;

export const RadioContent = styled.span`
  display: inline-flex;
  flex: justify-content;
  width: calc(100% - 3em);
`;

export const RadioName = styled.span<{ checked: boolean }>`
  color: ${props => props.checked ? props.theme.input.borderColorActive : props.theme.input.labelColor};
  width: 100%;
`;

export const Price = styled.span<{ checked: boolean }>`
  color: ${props => props.checked ? props.theme.input.textColor : props.theme.input.labelColor};
  width: 3rem;
`;
