import { IAddressWithEmail, IFormError } from "@app/types";
import { convertIFormErrorsToObjectErrors } from "@app/utils/errorsManagement";
import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink,
} from "@components/atoms";
import { TextField } from "@components/molecules";
import { IPrivacyPolicy } from "@sdk/api/Checkout/types";
import React, { useCallback, useState } from "react";
import {
  FirstNameTextField,
  PhoneTextField,
  StreetAddress1,
  StreetAddress2,
  CitySelect,
} from "./AddressFormContent/AddressFormFields";
import { IFieldsProps, ISelectFieldsProps } from "./AddressFormContent/types";
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
  isValid,
  values,
  citiesOptions,
  setFieldValue,
  setFieldTouched,
  onSelect,
  comeFromModal,
  validateForm,
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
    if (
      !values ||
      !values.firstName ||
      !values.documentNumber ||
      !values.phone ||
      !values.email ||
      !values.termsAndConditions ||
      !values.streetAddress1 ||
      !value
    ) {
      setFieldValue(name, "");
      return;
    }
    setFieldValue(name, value.code);
    selectCity(value.code, name);
    sessionStorage.removeItem("exist_checkout");
  };

  const selectCity = (value: any, name: string) => {
    if (validateForm) {
      validateForm()
        .then(d => {
          if (
            Object.getOwnPropertyNames(d).length === 1 &&
            Object.getOwnPropertyNames(d)[0] === "city"
          ) {
            isValid = true;
          }
        })
        .then(() => {
          const _values: IAddressWithEmail | undefined = values;
          if (_values) {
            _values.city = value;
            _values.country = {
              code: "PE",
              country: "Peru",
            };
            if (onSelect && isValid) {
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
        });
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

  const fieldsProps: IFieldsProps = { fieldErrors, values, basicInputProps };
  const cityProps: ISelectFieldsProps = {
    cities: _cities,
    fieldErrors,
    values,
  };

  return (
    <div>
      <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
        <S.Wrapper>
          {comeFromModal ? (
            <div style={{ width: "100%" }}>
              <S.FieldsGroup>
                {renderGroupLabel(1, "Cliente")}
                <FirstNameTextField fieldsProps={fieldsProps} />
                <PhoneTextField fieldsProps={fieldsProps} />
              </S.FieldsGroup>
              <S.FieldsGroup>
                {renderGroupLabel(2, "Dirección")}
                <S.RowWithOneCell>
                  <StreetAddress1 fieldsProps={fieldsProps} />
                  <StreetAddress2 fieldsProps={fieldsProps} />
                </S.RowWithOneCell>
                <S.RowWithOneCell>
                  <CitySelect
                    fieldsProps={{
                      ...cityProps,
                      handleCityChange: (value: any, name: any) => {
                        setFieldValue(name, value.code);
                      },
                    }}
                  />
                </S.RowWithOneCell>
              </S.FieldsGroup>
            </div>
          ) : (
            <div>
              <S.FieldsGroup>
                {renderGroupLabel(1, "Cliente")}
                <S.RowWithTwoCells>
                  <FirstNameTextField
                    fieldsProps={{ ...fieldsProps, required: true }}
                  />
                  <TextField
                    data-cy="addressFormDNI"
                    name="documentNumber"
                    placeholder="Número de documento"
                    label="*Número de documento"
                    maxLength={8}
                    value={
                      !values?.documentNumber ? "" : values?.documentNumber
                    }
                    autoComplete="documento"
                    readOnly={user}
                    errors={fieldErrors!.documentNumber}
                    onBlur={handleBlur}
                    onChange={e => {
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
                  <PhoneTextField fieldsProps={fieldsProps} />
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
                  <StreetAddress1 fieldsProps={fieldsProps} />
                  <StreetAddress2 fieldsProps={fieldsProps} />
                </S.RowWithTwoCells>
                <S.RowWithTwoCells>
                  <CitySelect
                    fieldsProps={{
                      ...cityProps,
                      handleCityChange,
                    }}
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
