import { ISelect } from '@components/atoms';
import { IFormError } from '@types';

export interface IInputSelectProps extends ISelect {
  label: string;
  inputProps?: object;
  errors?: IFormError[];
  indicatorIcon?: string | JSX.Element;
}
