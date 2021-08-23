import { useField, useFormikContext } from 'formik';
import React, { RefForwardingComponent } from 'react';
import { AddressAutocomplete, IAddressAutocompleteRef } from '..';
import { IAddressAutocompleteFieldProps } from './types';

const AddressAutocompleteFieldWithRef: RefForwardingComponent<
  IAddressAutocompleteRef,
  IAddressAutocompleteFieldProps
> = (
  {
    name,
    onChange,
    onChangeValue,
    onBlur,
    value,
    keepCoordinatesOnChange,
    latName = 'latitude',
    lngName = 'longitude',
    ...rest
  },
  ref
) => {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext();

  return (
    <AddressAutocomplete
      {...rest}
      name={field.name}
      value={{
        lat: values?.[latName] ? Number(values?.[latName]) : undefined,
        lng: values?.[lngName] ? Number(values?.[lngName]) : undefined,
        text: field.value || '',
      }}
      onChangeValue={(value, onlyText) => {
        helpers.setValue(value?.text || '');

        if (onlyText && !keepCoordinatesOnChange) {
          if (values?.[latName]) {
            setFieldValue(latName, undefined);
            setFieldValue(lngName, undefined);
          }
        } else {
          setFieldValue(latName, value.lat ? String(value.lat) : undefined);
          setFieldValue(lngName, value.lng ? String(value.lng) : undefined);
        }

        onChangeValue?.(value, onlyText);
      }}
      error={meta.error}
      onBlur={(e) => {
        onBlur?.(e);
        helpers.setTouched(true);
      }}
      ref={ref}
    />
  );
};

export const AddressAutocompleteField = React.forwardRef(
  AddressAutocompleteFieldWithRef
);
