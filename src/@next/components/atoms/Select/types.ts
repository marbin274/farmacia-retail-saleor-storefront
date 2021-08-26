import { IFormError } from '@types';
import { FocusEventHandler } from 'react';

export interface IProps {
  value?: any;
  name?: string;
  options?: any[];
  isOptionDisabled?: (option: any) => boolean;
  autoComplete?: string;
  defaultValue?: any;
  optionLabelKey?: string;
  menuIsOpen?: boolean;
  customStyles?: any;
  optionValueKey?: string;
  onChange?: (value: any, name?: any) => void;
  onBlur?: FocusEventHandler;
  clearable?: boolean;
  clearValue?: () => void;
  customComponents?: {
    Control: (props?: any) => JSX.Element | null;
    IndicatorSeparator: (props?: any) => JSX.Element | null;
    IndicatorsContainer: (props?: any) => JSX.Element | null;
    Option: (props?: any) => JSX.Element | null;
  };
  errors?: IFormError[];
}
