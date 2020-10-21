import { styled } from "@styles";

const getLabelColor = ( { active, error, disabled, theme }: WrapperProps) => {
  if (disabled) {
    return theme.colors.disabled;
  } else if (error) {
    return theme.input.labelColorError;
  } else if (active) {
    return theme.input.labelColorActive;
  } else {
    return theme.input.labelColor;
  }
}


export const Label = styled.label<{
  active: boolean;
  disabled: boolean;
  error: boolean;
  labelBackground: string | null;
}>`
  background-color: transparent;
  color: ${props => getLabelColor(props)}
  left: ${props => props.theme.input.labelLeft};
  position: absolute;
  font-size: ${props => props.theme.input.labelFontSize};
  pointer-events: none;
  top: ${props => props.theme.input.labelTop};
`;
