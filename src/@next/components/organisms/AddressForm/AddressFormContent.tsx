import React, { useCallback, useState } from "react";

import { InputSelect, TextField } from "@components/molecules";
import * as S from "./styles";
import { PropsWithFormik } from "./types";
import { Checkbox } from "../../atoms/Checkbox";
import { IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors,
  handleSubmit,
  values,
  user,
  citiesOptions,
  setFieldValue,
  includeEmail = false,
  onSelect,
}) => {
  const [privacyAndPolicies, setPrivacyAndPolicies] = useState(
    values && values?.termsAndConditions ? values?.termsAndConditions : false
  );

  const handlePrivacyAndPolicies = () => {
    setPrivacyAndPolicies(!privacyAndPolicies);
  };

  const [additionals, setAdditionals] = useState(
    values && values?.dataTreatmentPolicy ? values?.dataTreatmentPolicy : false
  );

  const handleAdditionals = () => {
    setAdditionals(!additionals);
  };

  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const _cities: any[] = [];

  citiesOptions?.map(x => {
    const item: any = {
      code: x,
      description: x,
    };
    _cities.push(item);
  });

  const selectCity = (value: any) => {
    const _values: any = values;
    _values.city = value;
    _values.country = {
      code: "PE",
      country: "Peru",
    };
    if (values && values?.email && onSelect) {
      const policyPrivacy: IPrivacyPolicy = {
        dataTreatmentPolicy: additionals,
        termsAndConditions: privacyAndPolicies,
      };
      onSelect(
        _values,
        user ? _values?.email : undefined,
        user ? _values.id : undefined,
        policyPrivacy,
        _values.documentNumber
      );
    }
  };

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
    <div>
      <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
        <S.Wrapper>
          <S.FieldsGroup>
            {renderGroupLabel(1, "Cliente")}
            <S.RowWithTwoCells>
              <TextField
                data-cy="addressFormFirstName"
                name="firstName"
                label="Nombre Completo"
                placeholder="Nombre Completo"
                value={!values?.firstName ? "" : values?.firstName}
                autoComplete="given-name"
                errors={fieldErrors!.firstName}
                {...basicInputProps()}
              />
              <TextField
                data-cy="addressFormDNI"
                name="documentNumber"
                placeholder="DNI"
                label="Dni"
                value={!values?.documentNumber ? "" : values?.documentNumber}
                autoComplete="dni"
                errors={fieldErrors!.documentNumber}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <TextField
                data-cy="addressFormEmail"
                name="email"
                placeholder="Email"
                label="Email"
                value={!values?.email ? "" : values?.email}
                autoComplete="email"
                errors={fieldErrors!.email}
                {...basicInputProps()}
              />
              <TextField
                data-cy="addressFormPhone"
                name="phone"
                placeholder="Telefono"
                label="Telefono"
                value={!values?.phone ? "" : values?.phone}
                autoComplete="tel"
                errors={fieldErrors!.phone}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
          </S.FieldsGroup>
          <S.FieldsGroup>
            {renderGroupLabel(2, "Politicas")}
            <S.RowWithTwoCells>
              <div className="privacyAndPolicies">
                <Checkbox
                  data-cy="addressFormTermsAndConditions"
                  name="termsAndConditions"
                  checked={privacyAndPolicies}
                  onChange={handlePrivacyAndPolicies}
                >
                  <label htmlFor="">
                    Estoy de acuerdo con las
                    <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf">
                      {" "}
                      Políticas de privacidad
                    </a>{" "}
                    y
                    <a href="https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf">
                      {" "}
                      Terminos y condiciones
                    </a>
                  </label>
                </Checkbox>
              </div>
              <div className="additionals">
                <Checkbox
                  data-cy="checkoutPaymentPromoCodeCheckbox"
                  name="dataTreatmentPolicy"
                  checked={additionals}
                  onChange={handleAdditionals}
                >
                  <label htmlFor="">
                    Acepto el tratamiento para{" "}
                    <a href="#"> Fines adicionales</a> (opcional )
                  </label>
                </Checkbox>
              </div>
            </S.RowWithTwoCells>
          </S.FieldsGroup>
          <S.FieldsGroup>
            {renderGroupLabel(3, "Dirección")}
            <S.RowWithTwoCells>
              <TextField
                data-cy="addressFormStreetAddress1"
                name="streetAddress1"
                label="Dirección"
                placeholder="Dirección"
                value={!values?.streetAddress1 ? "" : values?.streetAddress1}
                autoComplete="address-line1"
                errors={fieldErrors!.streetAddress1}
                {...basicInputProps()}
              />
              <TextField
                data-cy="addressFormStreetAddress2"
                name="streetAddress2"
                placeholder="Información adicional (opcional)"
                label="Información adicional (opcional)"
                value={!values?.streetAddress2 ? "" : values?.streetAddress2}
                autoComplete="address-line2"
                errors={fieldErrors!.streetAddress2}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <InputSelect
                inputProps={{
                  "data-cy": "addressFormCity",
                }}
                label="Distrito"
                name="city"
                options={_cities}
                value={
                  values!.city &&
                  _cities &&
                  _cities!.find(
                    option =>
                      option.code.toLowerCase() === values!.city?.toLowerCase()
                  )
                }
                onChange={(value: any, name: any) => {
                  setFieldValue(name, value.code);
                  selectCity(value.code);
                }}
                optionLabelKey="description"
                optionValueKey="code"
                errors={fieldErrors!.city}
              />
            </S.RowWithTwoCells>
          </S.FieldsGroup>
        </S.Wrapper>
      </S.AddressForm>
    </div>
  );
};
