import React, { useCallback } from "react";

import { InputSelect, TextField } from "@components/molecules";

import * as S from "./styles";
import { PropsWithFormik } from "./types";
// import { IAddressWithEmail } from "@temp/@next/types/IAddressWithEmail";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors,
  handleSubmit,
  values,
  citiesOptions,
  countriesOptions,
  defaultValue,
  setFieldValue,
  includeEmail = false,
  onSelect,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const _cities: any[] = [];
  citiesOptions?.flatMap(
    (x) => {
      const item: any = {
        code: x,
        description: x,
      };
      _cities.push(item);
    }
  )

  const selectCity = (value: any) => {
    const _values: any = values;
    _values.city = value;
    if (values && values?.email) {
      if(onSelect) {
        onSelect(_values, _values?.email)
      }
    }
  }

  const fieldErrors: any = {};

  if (errors) {
    errors.map(({ field, message }: { field: string; message: string }) => {
      fieldErrors[field] = fieldErrors[field]
        ? [...fieldErrors[field], { message }]
        : [{ message }];
    });
  }

  const renderGroupLabel = (id: number, title: string) => (
    <S.GroupLabel>
      <S.GroupLabelIndex>{id}</S.GroupLabelIndex>
      <S.GroupLabelTitle>{title}</S.GroupLabelTitle>
    </S.GroupLabel>
  );

  return (
    <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.FieldsGroup>
          {renderGroupLabel(1, 'Cliente')}
          <S.RowWithTwoCells>
            <TextField
              data-cy="addressFormFirstName"
              name="firstName"
              label="Nombre Completo"
              value={values!.firstName}
              autoComplete="given-name"
              errors={fieldErrors!.firstName}
              {...basicInputProps()}
            />
            {includeEmail && (
              <TextField
                data-cy="addressFormEmail"
                name="email"
                label="Email"
                value={values!.email}
                autoComplete="email"
                errors={fieldErrors!.email}
                {...basicInputProps()}
              />
            )}
          </S.RowWithTwoCells>
          <S.RowWithTwoCells>
            <TextField
              data-cy="addressFormPhone"
              name="phone"
              label="Telefono"
              value={values!.phone}
              autoComplete="tel"
              errors={fieldErrors!.phone}
              {...basicInputProps()}
            />
          </S.RowWithTwoCells>
        </S.FieldsGroup>
        <S.FieldsGroup>
          {renderGroupLabel(2, 'Dirección')}
          <S.RowWithTwoCells>
            <TextField
              data-cy="addressFormStreetAddress1"
              name="streetAddress1"
              label="Dirección"
              value={values!.streetAddress1}
              autoComplete="address-line1"
              errors={fieldErrors!.streetAddress1}
              {...basicInputProps()}
            />
            <TextField
              data-cy="addressFormStreetAddress2"
              name="streetAddress2"
              label="Información adicional (opcional)"
              value={values!.streetAddress2}
              autoComplete="address-line2"
              errors={fieldErrors!.streetAddress2}
              {...basicInputProps()}
            />
          </S.RowWithTwoCells>
          <S.RowWithTwoCells>
            <InputSelect
              inputProps={{
                "data-cy": "addressFormCountry",
              }}
              defaultValue={defaultValue}
              label="Pais"
              name="country"
              options={countriesOptions}
              value={
                values!.country &&
                countriesOptions &&
                countriesOptions!.find(
                  option => option.code === values!.country?.code
                )
              }
              onChange={(value: any, name: any) => setFieldValue(name, value)}
              optionLabelKey="country"
              optionValueKey="code"
              errors={fieldErrors!.country}
            />
            <InputSelect
              inputProps={{
                "data-cy": "addressFormCity",
              }}
              label="Distrito"
              name="city"
              options={_cities}
              value={values!.city &&
                _cities &&
                _cities!.find(
                  option => option.code === values!.city
                )}
              onChange={(value: any, name: any) => {
                setFieldValue(name, value.code);
                selectCity(value.code);
              }}
              optionLabelKey="description"
              optionValueKey="code"
              errors={fieldErrors!.city}
            />

            {/* <TextField
              data-cy="addressFormCity"
              name="city"
              label="Distrito"
              value={values!.city}
              autoComplete="address-level1"
              errors={fieldErrors!.city}
              onChange={(value: any, name: any) => {
                setFieldValue(name, value);
                selectCity(name, value);
              }}
              {...basicInputProps()}
            /> */}
          </S.RowWithTwoCells>
        </S.FieldsGroup>
      </S.Wrapper>
    </S.AddressForm>
  );
};
