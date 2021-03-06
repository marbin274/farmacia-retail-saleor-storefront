import { IFormError } from '@temp/@next/types';

export interface IProps {
  disabled?: boolean;
  name: string;
  errors?: IFormError[];
  minDate?: Date;
  maxDate?: Date;
  value?: Date | null;
  onChange: (date: Date | [Date, Date] | null) => void;
}
