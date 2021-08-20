import React, { FC } from 'react';
import { IFormError } from '@temp/@next/types';
import { useField } from 'formik';
import { InputSelect } from '@components/molecules';
import { IInputSelectFieldProps } from './types';

export const InputSelectField: FC<IInputSelectFieldProps> = ({
  inputProps,
  name,
  onChange,
  onBlur,
  placeholder = '',
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const getError = (): IFormError[] => {
    if (meta.error) {
      return [{ field: name, message: meta.error }];
    }

    return null;
  };

  return (
    <InputSelect
      {...rest}
      inputProps={{
        ...inputProps,
        name: field.name,
        placeholder: !field.value ? placeholder : '',
      }}
      value={field.value}
      name={field.name}
      errors={getError()}
      onChange={(value, name) => {
        helpers.setValue(value);
        onChange?.(value, name);
      }}
      onBlur={(e) => {
        helpers.setTouched(true);
        field.onBlur(e);
      }}
    />
  );
};
