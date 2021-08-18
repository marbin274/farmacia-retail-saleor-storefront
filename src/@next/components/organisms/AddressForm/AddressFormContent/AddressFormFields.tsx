import { AddressAutocomplete, IAddressAutocompleteRef, InputSelect } from "@components/molecules";
import React, { useEffect, useRef } from "react";
import { IFieldsProps, ISelectProps } from "./types";
import { InputField } from "@farmacia-retail/farmauna-components";
import { TOTAL_DISTRICT } from "@temp/core/config";
export const FirstNameTextField = ({
  fieldErrors,
  required,
  values,
  onBlur,
  onChange,
}: IFieldsProps) => {
  return (
    <InputField
      data-cy="addressFormFirstName"
      name="firstName"
      label={`Nombre completo`}
      placeholder="Ejemplo: Juan Perez"
      value={!values?.firstName ? "" : values?.firstName}
      autoComplete="given-name"
      error={!!fieldErrors?.firstName ? fieldErrors?.firstName[0].message : ""}
      onChange={onChange}
      inputSize="large"
      onBlur={onBlur}
    />
  );
};

export const PhoneTextField = ({
  fieldErrors,
  values,
  onBlur,
  onChange,
}: IFieldsProps) => {
  return (
    <InputField
      data-cy="addressFormPhone"
      name="phone"
      placeholder="Ejem: 912345678"
      maxLength={9}
      label="Número de celular"
      value={!values?.phone ? "" : values?.phone}
      autoComplete="tel"
      type="tel"
      error={!!fieldErrors?.phone ? fieldErrors?.phone[0].message : ""}
      pattern="\d*"
      onChange={onChange}
      inputSize="large"
      onBlur={onBlur}
    />
  );
};

export const StreetAddress1 = ({
  fieldErrors,
  values,
  onBlur,
  onChange,
  temporaryError,
}: IFieldsProps & { temporaryError?: string }) => {
  const error = fieldErrors?.streetAddress1?.[0]?.message || temporaryError;
  const ref = useRef<IAddressAutocompleteRef>();
  const containerRef = React.useRef<HTMLDivElement>();

  useEffect(() => {
    if (temporaryError) {
      ref.current?.focus({ preventScroll: true });
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [ref, containerRef, temporaryError]);

  return (
    <div ref={containerRef}>
      <AddressAutocomplete
        data-cy="addressAutocomplete"
        name="streetAddress1"
        label="Dirección"
        placeholder="Ejemplo: Av. Arenales 213"
        value={{
          lat: values?.latitude ? Number(values?.latitude) : undefined,
          lng: values?.longitude ? Number(values?.longitude) : undefined,
          text: values?.streetAddress1 || "",
        }}
        onChangeValue={onChange}
        error={error}
        inputSize="large"
        onBlur={onBlur}
        ref={ref}
      />
      {!error && (
        <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
          Escribe tu dirección y elige una de las opciones desplegadas
        </span>
      )}
    </div>
  );
};

export const StreetAddress2 = ({
  fieldErrors,
  values,
  onBlur,
  onChange,
}: IFieldsProps) => {
  return (
    <InputField
      data-cy="addressFormStreetAddress2"
      name="streetAddress2"
      placeholder="Ejem: Colegio, edificio, avenida"
      label="Referencia"
      value={!values?.streetAddress2 ? "" : values?.streetAddress2}
      autoComplete="address-line2"
      error={
        fieldErrors!.streetAddress2
          ? fieldErrors?.streetAddress2[0].message
          : ""
      }
      onChange={onChange}
      inputSize="large"
      onBlur={onBlur}
    />
  );
};

export const CitySelect = ({ fieldsProps }: ISelectProps) => {
  const { cities, fieldErrors, handleChange, handleBlur, values } = fieldsProps;
  const value =
    values!.city &&
    cities &&
    cities!.find(
      option => option.code.toLowerCase() === values!.city?.toLowerCase()
    );
  const showPlaceHolder = !value || (value && value.length === 0);

  return (
    <div className="fa-flex fa-flex-col">
      <InputSelect
        inputProps={{
          "data-cy": "addressFormCity",
          name: "city",
          placeholder: showPlaceHolder ? "Selecciona tu distrito" : "",
        }}
        name="city"
        label="Distrito"
        options={cities}
        value={value}
        optionLabelKey="description"
        optionValueKey="code"
        errors={fieldErrors!.city}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
        Llegamos a {TOTAL_DISTRICT} distritos de Lima
      </span>
    </div>
  );
};
