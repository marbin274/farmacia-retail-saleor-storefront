import { InputHTMLAttributes } from "react";

export type ITileRadioProps = {
  className?: string;
  label?: string;
  onClick?: () => void;
  radioProps: InputHTMLAttributes<HTMLInputElement>;
};
