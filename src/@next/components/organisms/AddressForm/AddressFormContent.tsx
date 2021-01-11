import { IAddressWithEmail, IFormError } from "@app/types";
import { convertIFormErrorsToObjectErrors } from "@app/utils/errorsManagement";
import { Checkbox, DataTreatmentPolicyLink, ErrorMessage, TermsAndConditionsLink } from "@components/atoms";
import { InputSelect, TextField } from "@components/molecules";
import { IPrivacyPolicy } from "@sdk/api/Checkout/types";
import React, { useCallback, useState } from "react";
import * as S from "./styles";
import { PropsWithFormik } from "./types";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  formikErrors,
  errors,
  handleSubmit,
  values,
  citiesOptions,
  setFieldValue,
  setFieldTouched,
  onSelect,
  comeFromModal,
  touched,
  user,
}) => {
  const [privacyAndPolicies, setPrivacyAndPolicies] = useState(
    values && values?.termsAndConditions ? values?.termsAndConditions : false
  );

  const [citySelected, setCitySelected] = useState(false);
  const [additionals, setAdditionals] = useState(
    values && values?.dataTreatmentPolicy ? values?.dataTreatmentPolicy : false
  );

  errors = [];

  for (const property of Object.keys(formikErrors)) {
    const _err: IFormError = {
      field: property,
      message: formikErrors[property],
    };
    if (touched.hasOwnProperty(property) || citySelected) {
      errors.push(_err);
    }
  }

  if (
    !privacyAndPolicies &&
    citySelected &&
    errors.filter(x => x.field === "termsAndConditions").length < 1
  ) {
    const _err: IFormError = {
      field: "termsAndConditions",
      message: "Por favor acepte los términos y condiciones",
    };
    errors.push(_err);
  }

  const fieldErrors: any = convertIFormErrorsToObjectErrors(errors);

  const _cities: any[] = [];
  citiesOptions?.map(x => {
    const item: any = {
      code: x,
      description: x,
    };
    _cities.push(item);
  });

  const handlePrivacyAndPolicies = () => {
    setFieldTouched("termsAndConditions", true);
    setFieldValue("termsAndConditions", !privacyAndPolicies);
  };

  const handleAdditionals = () => {
    setAdditionals(!additionals);
    setFieldTouched("dataTreatmentPolicy", true);
    setFieldValue("dataTreatmentPolicy", !additionals);
  };

  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const handleCityChange = (value: any, name: any) => {
    setCitySelected(true);
    if (!values ||
      !values.firstName ||
      !values.documentNumber ||
      !values.email ||
      !values.termsAndConditions ||
      !values.streetAddress1 ||
      !value
    ) {
      setFieldValue(name, '');
      return;
    }
    setFieldValue(name, value.code);
    selectCity(value.code, name);
  }

  const selectCity = (value: any, name: string) => {

    const _values: IAddressWithEmail | undefined = values;
    if (_values) {
      _values.city = value;
      _values.country = {
        code: "PE",
        country: "Peru",
      };

      if (onSelect) {
        const policyPrivacy: IPrivacyPolicy = {
          dataTreatmentPolicy: additionals,
          termsAndConditions: privacyAndPolicies,
        };
        errors = [];
        onSelect(
          _values,
          _values?.email,
          _values.id,
          policyPrivacy,
          _values.documentNumber
        );
      }
    }
  };


  const renderGroupLabel = (id: number, title: string) => (
    <S.GroupLabel>
      <S.GroupLabelIndex>{id}</S.GroupLabelIndex>
      <S.GroupLabelTitle>{title}</S.GroupLabelTitle>
    </S.GroupLabel>
  );

  React.useEffect(() => {
    setPrivacyAndPolicies(values?.termsAndConditions === true);
  }, [values?.termsAndConditions]);

  React.useEffect(() => {
    setAdditionals(values?.dataTreatmentPolicy === true);
  }, [values?.dataTreatmentPolicy]);

  return (
    <div>
      <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
        <S.Wrapper>
          {comeFromModal ? (
            <div style={{ width: "100%" }}>
              <S.FieldsGroup>
                {renderGroupLabel(1, "Cliente")}
                <TextField
                  data-cy="addressFormFirstName"
                  name="firstName"
                  label="Nombre completo"
                  placeholder="Nombre completo"
                  value={!values?.firstName ? "" : values?.firstName}
                  autoComplete="given-name"
                  errors={fieldErrors!.firstName}
                  {...basicInputProps()}
                />
                <TextField
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
              </S.FieldsGroup>
              <S.FieldsGroup>
                {renderGroupLabel(2, "Dirección")}
                <S.RowWithOneCell>
                  <TextField
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
                  <TextField
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
                </S.RowWithOneCell>
                <S.RowWithOneCell>
                  <InputSelect
                    inputProps={{
                      "data-cy": "addressFormCity",
                    }}
                    label="*Distrito"
                    name="city"
                    options={_cities}
                    value={
                      values!.city &&
                      _cities &&
                      _cities!.find(
                        option =>
                          option.code.toLowerCase() ===
                          values!.city?.toLowerCase()
                      )
                    }
                    onChange={(value: any, name: any) => {
                      setFieldValue(name, value.code);
                    }}
                    optionLabelKey="description"
                    optionValueKey="code"
                    errors={fieldErrors!.city}
                  />
                </S.RowWithOneCell>
              </S.FieldsGroup>
            </div>
          ) : (
              <div>
                <S.FieldsGroup>
                  {renderGroupLabel(1, "Cliente")}
                  <S.RowWithTwoCells>
                    <TextField
                      data-cy="addressFormFirstName"
                      name="firstName"
                      label="*Nombre completo"
                      placeholder="Nombre completo"
                      value={!values?.firstName ? "" : values?.firstName}
                      autoComplete="given-name"
                      readOnly={user}
                      errors={fieldErrors!.firstName}
                      {...basicInputProps()}
                    />
                    <TextField
                      data-cy="addressFormDNI"
                      name="documentNumber"
                      placeholder="Número de documento"
                      label="*Número de documento"
                      maxLength={20}
                      value={
                        !values?.documentNumber ? "" : values?.documentNumber
                      }
                      autoComplete="documento"
                      readOnly={user}
                      errors={fieldErrors!.documentNumber}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const value = e.currentTarget?.value?.toUpperCase();
                        setFieldValue("documentNumber", value);
                      }}
                    />
                  </S.RowWithTwoCells>
                  <S.RowWithTwoCells>
                    <TextField
                      data-cy="addressFormEmail"
                      name="email"
                      placeholder="Email"
                      label="*Email"
                      value={!values?.email ? "" : values?.email}
                      autoComplete="email"
                      errors={fieldErrors!.email}
                      {...basicInputProps()}
                    />
                    <TextField
                      data-cy="addressFormPhone"
                      name="phone"
                      placeholder="Número de celular"
                      label="Número de celular"
                      maxLength={9}
                      value={!values?.phone ? "" : values?.phone}
                      autoComplete="tel"
                      errors={fieldErrors!.phone}
                      {...basicInputProps()}
                    />
                  </S.RowWithTwoCells>
                  <S.RowWithOneCell>
                    <div className="privacyAndPolicies">
                      <Checkbox
                        data-cy="addressFormTermsAndConditions"
                        name="termsAndConditions"
                        checked={privacyAndPolicies}
                        onChange={handlePrivacyAndPolicies}
                      >
                        <TermsAndConditionsLink />
                      </Checkbox>
                      <ErrorMessage errors={fieldErrors!.termsAndConditions} />
                    </div>
                    <div className="additionals">
                      <Checkbox
                        data-cy="checkoutPaymentPromoCodeCheckbox"
                        name="dataTreatmentPolicy"
                        checked={additionals}
                        onChange={handleAdditionals}
                      >
                        <DataTreatmentPolicyLink />
                      </Checkbox>
                    </div>
                  </S.RowWithOneCell>
                </S.FieldsGroup>
                <S.FieldsGroup>
                  {renderGroupLabel(2, "Dirección")}
                  <S.RowWithTwoCells>
                    <TextField
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
                    <TextField
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
                  </S.RowWithTwoCells>
                  <S.RowWithTwoCells>
                    <InputSelect
                      inputProps={{
                        "data-cy": "addressFormCity",
                      }}
                      label="*Distrito"
                      name="city"
                      options={_cities}
                      value={
                        values!.city &&
                        _cities &&
                        _cities!.find(
                          option =>
                            option.code.toLowerCase() ===
                            values!.city?.toLowerCase()
                        )
                      }
                      onChange={handleCityChange}
                      optionLabelKey="description"
                      optionValueKey="code"
                      errors={fieldErrors!.city}
                    />
                  </S.RowWithTwoCells>
                </S.FieldsGroup>
              </div>
            )}
        </S.Wrapper>
      </S.AddressForm>
    </div>
  );
};
