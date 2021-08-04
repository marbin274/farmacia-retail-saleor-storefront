import { InputHTMLAttributes } from "react";

export type ITileRadioProps = {
  className?: string;
  label?: string;
  onClick?: () => void;
  hasError?: boolean;
  radioProps: InputHTMLAttributes<HTMLInputElement>;
  contentNoSpacing?: boolean;
};
