import { InputSelect, TextField, AddressAutocomplete } from "@components/molecules";
import React from "react";
import { IProps, ISelectProps } from "./types";

export const FirstNameTextField = ({ fieldsProps }: IProps) => {
    const { fieldErrors, required, values, basicInputProps } = fieldsProps;
    return <TextField
        data-cy="addressFormFirstName"
        name="firstName"
        label={`${(required ? "*" : "")}Nombre completo`}
        placeholder="Ejemplo: Juan Perez"
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
        placeholder="Ejemplo: 912345678"
        maxLength={9}
        label="*Número de celular"
        value={!values?.phone ? "" : values?.phone}
        autoComplete="tel"
        type="tel"
        errors={fieldErrors!.phone}
        pattern="\d*"
        {...basicInputProps()}
    />
}

export const StreetAddress1 = ({ fieldsProps }: IProps) => {
    const { fieldErrors, values, setFieldValue } = fieldsProps;

    return (
        <AddressAutocomplete
            data-cy="addressAutocomplete"
            name="streetAddress1"
            label="*Dirección"
            placeholder="Ejemplo: Av.arenales 213"
            value={{
                lat: values?.latitude ? Number(values?.latitude) : undefined,
                lng: values?.longitude ? Number(values?.longitude) : undefined,
                text: values?.streetAddress1 || "",
            }}
            onChangeValue={value => {
                setFieldValue("streetAddress1", value.text || "");
                setFieldValue("latitude", value.lat ? String(value.lat) : "");
                setFieldValue("longitude", value.lng ? String(value.lng) : "");
            }}
            errors={fieldErrors!.streetAddress1}
        />
    );
};

export const StreetAddress2 = ({ fieldsProps }: IProps) => {
    const { fieldErrors, values, basicInputProps } = fieldsProps;
    return <TextField
        data-cy="addressFormStreetAddress2"
        name="streetAddress2"
        placeholder="Ejemplo: Edificio, apartamento"
        label="Referencia"
        value={
            !values?.streetAddress2 ? "" : values?.streetAddress2
        }
        autoComplete="address-line2"
        errors={fieldErrors!.streetAddress2}
        {...basicInputProps()}
    />
}

export const CitySelect = ({ fieldsProps }: ISelectProps) => {
    const { cities, fieldErrors, handleChange, handleBlur, values } = fieldsProps;
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
            name:"city",
            placeholder: showPlaceHolder ? "Selecciona tu distrito" : "",            
        }}
        name="city"
        label="*Distrito"
        options={cities}
        value={value}
        optionLabelKey="description"
        optionValueKey="code"
        errors={fieldErrors!.city}
        onChange={handleChange}
        onBlur={handleBlur}
        
    />
}
