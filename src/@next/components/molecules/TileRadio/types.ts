import { InputHTMLAttributes } from 'react';

export type ITileRadioProps = {
  className?: string;
  contentBgHighlighted?: boolean;
  contentNoSpacing?: boolean;
  label?: string;
  onClick?: () => void;
  hasError?: boolean;
  icon?: JSX.Element;
  radioProps: InputHTMLAttributes<HTMLInputElement>;
};
