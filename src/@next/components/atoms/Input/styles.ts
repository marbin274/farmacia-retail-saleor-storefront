import { DefaultTheme, styled } from "@styles";

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

const getTextColor = (
  { active, error, disabled, theme }: WrapperProps,
  hovered = false
) => {
  switch (true) {
    case disabled:
      return theme.colors.disabled;
    case error:
    // TODO: change this line code when font color needs to change.
    case active:
      return theme.input.textColorActive;
    case hovered:
      return theme.input.textColorHover;
    default:
      return theme.input.textColor;
  }
};

const getEdgeColor = (
  { active, error, disabled, theme }: WrapperProps,
  hovered = false
) => {
  switch (true) {
    case disabled:
      return theme.colors.disabled;
    case error:
      return theme.input.borderColorError;
    case active:
      return theme.input.borderColorActive;
    case hovered:
      return theme.input.borderColorActive;
    default:
      return theme.input.borderColor;
  }
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: 1px solid ${props => getEdgeColor(props)};
  border-radius: ${props => props.theme.input.borderRadius};
  color: ${props => getEdgeColor(props)};
  outline: none;
  transition: all 0.3s ease;
  &:hover {
    color: ${props => getTextColor(props, true)};
    border-color: ${props => getEdgeColor(props, true)};
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-right: 1.5rem;
  border-radius: ${props => props.theme.input.borderRadius};
`;

export const InputIconWrapper = styled.div`
  height: 1rem;
  position: absolute;
  right: 1rem;
  top: calc(50% - 0.5rem);
  width: 1rem;
`;

export const Input = styled.input<WrapperProps>`
  padding: 0.75rem 1rem;
  margin: 0;
  border: none;
  color: ${props => getTextColor(props)};
  width: 100%;
  font-size: ${props => props.theme.input.textFontSize};
  outline: none;
  background-color: transparent;

  ::placeholder {
    color: ${props => props.theme.input.placeholderColor};
  }
`;
