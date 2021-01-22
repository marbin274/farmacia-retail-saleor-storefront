export interface IProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  errors: any;
  loading:boolean;
  values: any;
  tokenError: boolean;
  passwordError: string;
}
