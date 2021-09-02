import { DefaultTheme, styled } from '@styles';
import { ReactSVG } from 'react-svg';

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

type IconProps = {
  error: number;
  disabled: boolean;
  theme: DefaultTheme;
};

type IconOptionsProps = {
  hasRightIcon: boolean;
};

type InputProps = WrapperProps & IconOptionsProps;

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

const getIconColor = ({ error, disabled, theme }: IconProps) => {
  switch (true) {
    case disabled:
      return theme.colors.disabled;
    case Boolean(error):
      return theme.input.borderColorError;
    default:
      return theme.input.iconColorDefault;
  }
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: 1px solid ${(props) => getEdgeColor(props)};
  border-radius: ${(props) => props.theme.input.borderRadius};
  color: ${(props) => getEdgeColor(props)};
  outline: none;
  transition: all 0.3s ease;
  &:hover {
    color: ${(props) => getTextColor(props, true)};
    border-color: ${(props) => getEdgeColor(props, true)};
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div<IconOptionsProps>`
  position: relative;
  width: 100%;
  padding-right: ${(props) => (props.hasRightIcon ? '2rem' : '0')};
  border-radius: ${(props) => props.theme.input.borderRadius};
  background-color: white;
`;

export const Input = styled.input<InputProps>`
  padding: ${(props) =>
    props.hasRightIcon ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 1rem'};
  margin: 0;
  border: none;
  color: ${(props) => getTextColor(props)};
  width: 100%;
  font-size: ${(props) => props.theme.input.textFontSize};
  outline: none;
  background-color: transparent;
  border-radius: ${(props) => props.theme.input.borderRadius};

  ::placeholder {
    color: ${(props) => props.theme.input.placeholderColor};
  }
`;

export const IconRight = styled(ReactSVG)<IconProps>`
  height: 1.5rem;
  position: absolute;
  right: 0.5rem;
  top: calc(50% - 0.65rem);
  width: 1.5rem;
  color: ${(props) => getIconColor(props)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;
