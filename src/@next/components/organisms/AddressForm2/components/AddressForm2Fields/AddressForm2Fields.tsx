// TODO: Refactorizar y hacer los field componentes globales
import React, { FC, RefForwardingComponent } from 'react';
import {
  AddressAutocomplete,
  IAddressAutocompleteProps,
  IAddressAutocompleteRef,
  InputSelect,
} from '@components/molecules';
import { IInputSelectProps } from '@temp/@next/components/molecules/InputSelect/types';
import { useField, useFormikContext } from 'formik';
import { IFormError } from '@temp/@next/types';
import Map from '@components/organisms/AddressForm/AddressFormContent/Map';
import { InputField } from '@farmacia-retail/farmauna-components';

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

type IAddessAutocompleteFieldProps = {
  latName?: string;
  lngName?: string;
  keepCoordinatesOnChange?: boolean;
} & IAddressAutocompleteProps;

const AddessAutocompleteFieldWithRef: RefForwardingComponent<
  IAddressAutocompleteRef,
  IAddessAutocompleteFieldProps
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

export const AddessAutocompleteField = React.forwardRef(
  AddessAutocompleteFieldWithRef
);

type IMapFieldProps = {
  addressName: string;
  latName?: string;
  lngName?: string;
  onChangeLocation?: (
    location: google.maps.LatLngLiteral,
    address: string
  ) => void;
};

export const MapField: FC<IMapFieldProps> = ({
  addressName,
  latName = 'latitude',
  lngName = 'longitude',
  onChangeLocation,
}) => {
  const { values, setFieldValue } = useFormikContext();

  const getCoordinates = () => {
    if (!values?.[latName] || !values?.[lngName]) {
      return;
    }

    return { lat: Number(values[latName]), lng: Number(values[lngName]) };
  };

  return (
    <Map
      location={getCoordinates()}
      onChangeLocation={(location, address) => {
        setFieldValue(addressName, address);
        setFieldValue(latName, String(location.lat));
        setFieldValue(lngName, String(location.lng));
        onChangeLocation?.(location, address);
      }}
    />
  );
};

type IInputTextFieldProps = {
  placeholder: string;
  error?: string | undefined;
  inputSize?: 'small' | 'normal' | 'large' | undefined;
  suffix?: React.ReactNode;
  label?: React.ReactNode;
  message?: React.ReactNode;
  rounded?: boolean | undefined;
  success?: boolean | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

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
