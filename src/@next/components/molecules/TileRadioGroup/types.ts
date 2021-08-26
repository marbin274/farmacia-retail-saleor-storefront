export type ITileRadioGroupProps = {
  hasError?: boolean;
  onChangeValue?: (value: string) => void;
  value?: string;
  options: ITileRadioOption[];
};

export type ITileRadioOption = {
  icon?: JSX.Element;
  label: string;
  value: string;
  withInput?: boolean;
};
