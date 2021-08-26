export type IInputTextFieldProps = {
  placeholder: string;
  error?: string | undefined;
  inputSize?: 'small' | 'normal' | 'large' | undefined;
  suffix?: React.ReactNode;
  label?: React.ReactNode;
  message?: React.ReactNode;
  rounded?: boolean | undefined;
  success?: boolean | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;
