import React, { FC } from 'react';
import { InputSelect } from '@components/molecules';
import { IInputSelectProps } from '@temp/@next/components/molecules/InputSelect/types';
import { useField } from 'formik';
import { IFormError } from '@temp/@next/types';

type IInputSelectFieldProps = {
  placeholder?: string;
} & IInputSelectProps;

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
