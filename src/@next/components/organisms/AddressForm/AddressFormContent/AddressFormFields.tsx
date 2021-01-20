import { InputSelect, TextField } from "@components/molecules";
import React from "react";
import { IProps, ISelectProps } from "./types";

export const FirstNameTextField = ({ fieldsProps }: IProps) => {
    const { fieldErrors, required, values, basicInputProps } = fieldsProps;
    return <TextField
        data-cy="addressFormFirstName"
        name="firstName"
        label={`${(required ? "*" : "")}Nombre completo`}
        placeholder="Nombre completo"
        value={!values?.firstName ? "" : values?.firstName}
        autoComplete="given-name"
        errors={fieldErrors!.firstName}
        {...basicInputProps()}
    />
}

export const PhoneTextField = ({ fieldsProps }: IProps) => {
    const { fieldErrors, values, basicInputProps } = fieldsProps;
    return <TextField
        data-cy="addressFormPhone"
        name="phone"
        placeholder="Número de celular"
        maxLength={9}
        label="Número de celular"
        value={!values?.phone ? "" : values?.phone}
        autoComplete="tel"
        errors={fieldErrors!.phone}
        {...basicInputProps()}
    />
}

export const StreetAddress1 = ({ fieldsProps }: IProps) => {
    const { fieldErrors, values, basicInputProps } = fieldsProps;
    return <TextField
        data-cy="addressFormStreetAddress1"
        name="streetAddress1"
        label="*Dirección"
        placeholder="Dirección"
        value={
            !values?.streetAddress1 ? "" : values?.streetAddress1
        }
        autoComplete="address-line1"
        errors={fieldErrors!.streetAddress1}
        {...basicInputProps()}
    />
}

export const StreetAddress2 = ({ fieldsProps }: IProps) => {
    const { fieldErrors, values, basicInputProps } = fieldsProps;
    return <TextField
        data-cy="addressFormStreetAddress2"
        name="streetAddress2"
        placeholder="Información adicional"
        label="Información adicional"
        value={
            !values?.streetAddress2 ? "" : values?.streetAddress2
        }
        autoComplete="address-line2"
        errors={fieldErrors!.streetAddress2}
        {...basicInputProps()}
    />
}

export const CitySelect = ({ fieldsProps }: ISelectProps) => {
    const { cities, fieldErrors, values, handleCityChange } = fieldsProps;
    const value = values!.city &&
        cities &&
        cities!.find(
            option =>
                option.code.toLowerCase() ===
                values!.city?.toLowerCase()
        );
    const showPlaceHolder = !value || (value && value.length === 0);

    return <InputSelect
        inputProps={{
            "data-cy": "addressFormCity",
            placeholder: showPlaceHolder ? "Selecciona tu distrito" : "",
        }}
        label="*Distrito"
        name="city"
        options={cities}
        value={value}
        onChange={handleCityChange}
        optionLabelKey="description"
        optionValueKey="code"
        errors={fieldErrors!.city}
    />
}