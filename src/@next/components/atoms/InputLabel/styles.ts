import { styled } from "@styles";

export const Label = styled.label<{
  active: boolean;
  disabled: boolean;
  error: boolean;
  labelBackground: string | null;
}>`
  background-color: transparent;
  left: ${props => props.theme.input.labelLeft};
  position: absolute;
  pointer-events: none;
  top: ${props => props.theme.input.labelTop};
`;
