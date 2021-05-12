import { convertIFormErrorsToObjectErrors } from "@app/utils/errorsManagement";
import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink,
} from "@components/atoms";
import { TextField } from "@components/molecules";
import React, { useCallback, useState } from "react";
import { DOCUMENT_NUMBER_MAX_LENGTH } from "@app/utils/schemasConfig";
import {
  CitySelect,
  FirstNameTextField,
  PhoneTextField,
  StreetAddress1,
  StreetAddress2,
} from "./AddressFormContent/AddressFormFields";
import Map from "./AddressFormContent/Map";
import { IFieldsProps, ISelectFieldsProps } from "./AddressFormContent/types";
import * as S from "./styles";
import { PropsWithFormik } from "./types";
import {
  launchCheckoutEvent,
  steps,
  ecommerceProductsMapper,
  getLocalStorageForCart,
} from "@temp/@sdk/gaConfig";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors = [],
  handleSubmit,
  values,
  citiesOptions,
  setFieldValue,
  setFieldTouched,
  comeFromModal,
}) => {
  const [privacyAndPolicies, setPrivacyAndPolicies] = useState(
    values && values?.termsAndConditions ? values?.termsAndConditions : false
  );

  const [additionals, setAdditionals] = useState(
    values && values?.dataTreatmentPolicy ? values?.dataTreatmentPolicy : false
  );

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

  const isValuesInvalid = (): boolean => {
    return (
      !values ||
      !values.firstName ||
      !values.documentNumber ||
      !values.phone ||
      !values.email ||
      !values.termsAndConditions ||
      !values.streetAddress1
    );
  };

  const handleCityChange = (value: any, name: any) => {
    const isValid = !isValuesInvalid();
    setFieldValue(name, isValid ? value.code : "");
    setTimeout(() => {
      formRef?.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    }, 300);
  };

  const renderGroupLabel = (id: number, title: string) => (
    <S.GroupLabel>
      <S.GroupLabelIndex>{id}</S.GroupLabelIndex>
      <S.GroupLabelTitle>{title}</S.GroupLabelTitle>
    </S.GroupLabel>
  );

  React.useEffect(() => {
    setPrivacyAndPolicies(values?.termsAndConditions === true);
    if (values?.termsAndConditions === true) {
      launchCheckoutEvent(
        steps.privacyPolicyAcepted,
        ecommerceProductsMapper(getLocalStorageForCart())
      );
    }
  }, [values?.termsAndConditions]);

  React.useEffect(() => {
    setAdditionals(values?.dataTreatmentPolicy === true);
  }, [values?.dataTreatmentPolicy]);

  React.useEffect(() => {
    if (
      values?.firstName &&
      values?.documentNumber &&
      values?.phone &&
      values?.email &&
      values?.documentNumber?.length >= 8 &&
      values?.phone?.length === 9 &&
      values?.email.includes("@")
    ) {
      launchCheckoutEvent(
        steps.filledContactUserData,
        ecommerceProductsMapper(getLocalStorageForCart())
      );
    }
  }, [values?.firstName, values?.documentNumber, values?.phone, values?.email]);

  const fieldsProps: IFieldsProps = {
    basicInputProps,
    fieldErrors,
    setFieldValue,
    values,
  };

  const cityProps: ISelectFieldsProps = {
    ...fieldsProps,
    cities: _cities,
    handleBlur: basicInputProps().onBlur,
  };

  const getCoordinates = () => {
    if (!values?.latitude || !values.longitude) {
      return;
    }
    return { lat: Number(values.latitude), lng: Number(values.longitude) };
  };

  return (
    <div>
      <S.Wrapper>
        {comeFromModal ? (
          <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
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
                      handleChange: (value: any, name: any) => {
                        setFieldValue(name, value.code);
                      },
                    }}
                  />
                </S.RowWithOneCell>
              </S.FieldsGroup>
            </div>
          </S.AddressForm>
        ) : (
          <div>
            <S.FieldsGroup>
              {renderGroupLabel(1, "Datos Personales")}
              <S.RowWithTwoCells>
                <FirstNameTextField
                  fieldsProps={{ ...fieldsProps, required: true }}
                />
                <TextField
                  data-cy="addressFormDNI"
                  name="documentNumber"
                  placeholder="Ejemplo: 04123456"
                  label="*Número de documento"
                  maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
                  value={!values?.documentNumber ? "" : values?.documentNumber}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  type="text"
                  autoComplete="documento"
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
                  placeholder="Ejemplo: juan@gmail.com"
                  label="*Correo electrónico"
                  value={!values?.email ? "" : values?.email}
                  autoComplete="email"
                  type="email"
                  errors={fieldErrors!.email}
                  {...basicInputProps()}
                />
                <PhoneTextField fieldsProps={fieldsProps} />
              </S.RowWithTwoCells>
              <S.RowWithTwoCells>
                <S.PrivacyAndPolicies>
                  <Checkbox
                    data-cy="addressFormTermsAndConditions"
                    error={!!fieldErrors!.termsAndConditions}
                    name="termsAndConditions"
                    checked={privacyAndPolicies}
                    onChange={handlePrivacyAndPolicies}
                  >
                    <TermsAndConditionsLink />
                  </Checkbox>
                  <ErrorMessage errors={fieldErrors!.termsAndConditions} />
                </S.PrivacyAndPolicies>
              </S.RowWithTwoCells>
              <S.RowWithTwoCells>
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
              </S.RowWithTwoCells>
            </S.FieldsGroup>
            <S.FieldsGroup>
              {renderGroupLabel(2, "Dirección de entrega")}
              <S.RowWithTwoCells>
                <StreetAddress1 fieldsProps={fieldsProps} />
                <S.Referencia>
                  <StreetAddress2 fieldsProps={fieldsProps} />
                </S.Referencia>
              </S.RowWithTwoCells>
              <Map
                location={getCoordinates()}
                onChangeLocation={(location, address) => {
                  setFieldValue("streetAddress1", address);
                  setFieldValue("latitude", String(location.lat));
                  setFieldValue("longitude", String(location.lng));
                }}
              />
              <S.RowWithTwoCells>
                <S.Referencia mobile>
                  <StreetAddress2 fieldsProps={fieldsProps} />
                </S.Referencia>
                <CitySelect
                  fieldsProps={{
                    ...cityProps,
                    handleChange: handleCityChange,
                  }}
                />
              </S.RowWithTwoCells>
            </S.FieldsGroup>
          </div>
        )}
      </S.Wrapper>
    </div>
  );
};
