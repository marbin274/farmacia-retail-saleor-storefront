import React, { FC } from 'react';
import { useField } from 'formik';
import { InputField } from '@farmacia-retail/farmauna-components';
import { IInputTextFieldProps } from './types';

export const InputTextField: FC<IInputTextFieldProps> = ({
  name,
  onBlur,
  onChange,
  ...rest
}) => {
  const [field, meta] = useField(name);

  return (
    <InputField
      {...rest}
      name={field.name}
      value={field.value || ''}
      error={meta.error}
      onChange={(e) => {
        field.onChange(e);
        onChange?.(e);
      }}
      onBlur={(e) => {
        field.onBlur(e);
        onBlur?.(e);
      }}
    />
  );
};
