import { ITileRadioOption } from '..';

export type ITileRadioGroupFieldProps = {
  name: string;
  onChangeValue?: (value: string) => void;
  options: ITileRadioOption[];
};
