import React, { FC } from 'react';
import { useField } from 'formik';
import { TileRadioGroup } from '..';
import { ITileRadioGroupFieldProps } from './types';

export const TileRadioGroupField: FC<ITileRadioGroupFieldProps> = ({
  name,
  onChangeValue,
  options,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
    onChangeValue?.(value);
  };

  return (
    <TileRadioGroup
      value={field.value}
      onChangeValue={handleChange}
      hasError={!!meta.error}
      options={options}
    />
  );
};
