import {DefaultTheme, styled} from "@styles";

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

const getLabelColor = ( { active, error, disabled, theme }: WrapperProps) => {
  switch (true) {
    case disabled:
      return theme.colors.disabled;
    case error:
      return theme.input.labelColorError;
    case active:
      return theme.input.labelColorActive;
    default:
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
