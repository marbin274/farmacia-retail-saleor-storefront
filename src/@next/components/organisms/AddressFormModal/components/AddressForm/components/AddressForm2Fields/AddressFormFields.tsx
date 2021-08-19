// TODO: Refactorizar y hacer los field componentes globales
import React, { FC, RefForwardingComponent, useEffect } from 'react';
import {
  Alert,
  AddressAutocomplete,
  IAddressAutocompleteProps,
  IAddressAutocompleteRef,
  InputSelect,
  TileRadio,
} from '@components/molecules';
import { IInputSelectProps } from '@temp/@next/components/molecules/InputSelect/types';
import { useField, useFormikContext } from 'formik';
import { IFormError } from '@temp/@next/types';
import Map from '@components/organisms/AddressForm/AddressFormContent/Map';
import {
  InputField,
  InformationIcon,
  ErrorIcon,
} from '@farmacia-retail/farmauna-components';
import { IGeoJson } from '@temp/core/types/address';
import { isCoordinatesInsideBouds } from '@temp/core/utils';

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
  geoJsonBounds?: IGeoJson;
  latName?: string;
  lngName?: string;
  onChangeLocation?: (
    location: google.maps.LatLngLiteral,
    address: string
  ) => void;
};

export const MapField: FC<IMapFieldProps> = ({
  addressName,
  geoJsonBounds,
  latName = 'latitude',
  lngName = 'longitude',
  onChangeLocation,
}) => {
  const { values, setFieldValue, errors } = useFormikContext();

  const getCoordinates = () => {
    if (!values?.[latName] || !values?.[lngName]) {
      return;
    }

    return { lat: Number(values[latName]), lng: Number(values[lngName]) };
  };

  const renderAlert = () => {
    if (!geoJsonBounds || !values[latName]) {
      return null;
    }

    const isInsideBounds = isCoordinatesInsideBouds(
      Number(values[latName]),
      Number(values[lngName]),
      geoJsonBounds
    );

    if (isInsideBounds) {
      return (
        <Alert
          type="info"
          message="Verifica tu ubicación en el mapa"
          icon={<InformationIcon />}
          className="fa-mt-2"
        />
      );
    }

    return (
      <Alert
        type="error"
        message="Por el momento no tenemos cobertura en esta zona"
        icon={<ErrorIcon />}
        className="fa-mt-2"
      />
    );
  };

  return (
    <div>
      <Map
        location={getCoordinates()}
        onChangeLocation={(location, address) => {
          setFieldValue(addressName, address);
          setFieldValue(latName, String(location.lat));
          setFieldValue(lngName, String(location.lng));
          onChangeLocation?.(location, address);
        }}
        geoJson={geoJsonBounds}
        hasError={!!errors?.[latName]}
      />
      {renderAlert()}
    </div>
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

type ITileRadioGroupFieldProps = {
  name: string;
  onChangeValue?: (value: string) => void;
  options: ITileRadioOption[];
};

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

type ITileRadioGroupProps = {
  hasError?: boolean;
  onChangeValue?: (value: string) => void;
  value?: string;
  options: ITileRadioOption[];
};

export type ITileRadioOption = {
  icon?: JSX.Element;
  label: string;
  value: string;
  withInput?: boolean;
};

export const TileRadioGroup: FC<ITileRadioGroupProps> = ({
  hasError,
  onChangeValue,
  options,
  value,
}) => {
  const [option, setOption] = React.useState<string>();

  useEffect(() => {
    if (!option && value) {
      let currentOption = options.find((o) => o.value === value);

      if (!currentOption) {
        currentOption = options.find((o) => o.withInput === true);
      }

      setOption(currentOption.value);
    }
  }, [option, value]);

  return (
    <div>
      {options.map(({ icon, label, value: optionValue, withInput }) => (
        <TileRadio
          key={optionValue}
          label={label}
          icon={icon}
          radioProps={{
            checked: option === optionValue,
          }}
          onClick={() => {
            setOption(optionValue);

            if (withInput) {
              onChangeValue?.('');
            } else {
              onChangeValue?.(optionValue);
            }
          }}
          className="fa-mb-4 fa-bg-neutral-light"
          contentBgHighlighted
          hasError={hasError}
        >
          {withInput && (
            <div>
              <p className="fa-text-sm fa-mb-2">
                Ingresa un nombre a la dirección
              </p>
              <InputField
                placeholder=""
                value={value}
                onChange={(e) => {
                  onChangeValue?.(e.target.value);
                }}
              />
            </div>
          )}
        </TileRadio>
      ))}
    </div>
  );
};
