import { convertIFormErrorsToObjectErrors } from "@app/utils/errorsManagement";
import { DOCUMENT_NUMBER_MAX_LENGTH } from "@app/utils/schemasConfig";
import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink,
} from "@components/atoms";
import { IAddressAutocompleteValue } from "@components/molecules";
import { IAddressWithEmail } from "@temp/@next/types";
import {
  launchCheckoutFilledContactUserDataEvent,
  launchCheckoutFilledInputForAddressEvent,
  launchCheckoutPrivacyPolicyAceptedEvent,
} from "@temp/@sdk/gaConfig";
import React, { useState } from "react";
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
import { InputField } from "@farmacia-retail/farmauna-components";

const isValuesInvalid = (values?: IAddressWithEmail): boolean => {
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

const checkFilledContactUser = (values?: IAddressWithEmail): boolean => {
  return !!(
    values?.firstName &&
    values?.documentNumber &&
    values?.phone &&
    values?.email &&
    values?.documentNumber?.length >= 8 &&
    values?.phone?.length === 9 &&
    values?.email.includes("@")
  );
};

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors = [],
  handleSubmit,
  values,
  districtsOptions,
  setFieldValue,
  setFieldTouched,
  comeFromModal,
  temporaryStreeAddress1Error,
  clearTemporaryAddressError,
}) => {
  const initialTermAndconditions =
    values && values?.termsAndConditions ? values?.termsAndConditions : false;
  const registerFilledContactUserDataRef = React.useRef<boolean>(false);
  const registerPrivacyPolicyAceptedRef = React.useRef<boolean>(false);
  const registerFilledInputForAddressRef = React.useRef<boolean>(false);
  const [privacyAndPolicies, setPrivacyAndPolicies] = useState<boolean>(
    initialTermAndconditions
  );

  const [additionals, setAdditionals] = useState(
    values && values?.dataTreatmentPolicy ? values?.dataTreatmentPolicy : false
  );

  const fieldErrors: any = convertIFormErrorsToObjectErrors(errors);

  const _cities: any[] = [];
  districtsOptions?.map(x => {
    const item: any = {
      code: x,
      description: x,
    };
    _cities.push(item);
  });

  const registerFilledContactUserData = (isChecked: boolean) => {
    if (!registerFilledContactUserDataRef.current && isChecked) {
      registerFilledContactUserDataRef.current = true;
      launchCheckoutFilledContactUserDataEvent();
    }
  };

  const registerFillPrivacyPolicyAcepted = (isChecked: boolean) => {
    if (!registerPrivacyPolicyAceptedRef.current && isChecked) {
      registerPrivacyPolicyAceptedRef.current = true;
      launchCheckoutPrivacyPolicyAceptedEvent();
    }
  };

  const registerFilledInputForAddress = (isChecked: boolean) => {
    if (!registerFilledInputForAddressRef.current && isChecked) {
      registerFilledInputForAddressRef.current = true;
      launchCheckoutFilledInputForAddressEvent();
    }
  };

  const handleOnBlurCheckContactUser = (e: React.FocusEvent) => {
    registerFilledContactUserData(checkFilledContactUser(values));
    handleBlur?.(e);
  };

  const handlePrivacyAndPolicies = () => {
    setFieldTouched("termsAndConditions", true);
    setFieldValue("termsAndConditions", !privacyAndPolicies);
    registerFillPrivacyPolicyAcepted(!privacyAndPolicies);
  };

  const handleAdditionals = () => {
    setAdditionals(!additionals);
    setFieldTouched("dataTreatmentPolicy", true);
    setFieldValue("dataTreatmentPolicy", !additionals);
  };

  const handleCityChange = (value: any, name: any) => {
    const isValid = !isValuesInvalid(values);
    setFieldValue(name, isValid ? value.code : "");

    setTimeout(() => {
      formRef?.current?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    }, 300);
  };

  const renderGroupLabel = (title: string) => (
    <span className="fa-text-xl fa-mb-6 fa-block fa-font-semibold">
      {title}
    </span>
  );

  const fieldsProps: IFieldsProps = {
    fieldErrors,
    onBlur: handleBlur,
    onChange: handleChange,
    setFieldValue,
    values,
  };

  const cityProps: ISelectFieldsProps = {
    ...fieldsProps,
    cities: _cities,
    handleBlur,
  };

  const getCoordinates = () => {
    if (!values?.latitude || !values.longitude) {
      return;
    }
    return { lat: Number(values.latitude), lng: Number(values.longitude) };
  };

  React.useEffect(() => {
    if (values?.longitude && temporaryStreeAddress1Error) {
      clearTemporaryAddressError?.();
    }
  }, [values?.longitude]);

  React.useEffect(() => {
    setPrivacyAndPolicies(!!values?.termsAndConditions);
  }, [values?.termsAndConditions]);

  React.useEffect(() => {
    setAdditionals(!!values?.dataTreatmentPolicy);
  }, [values?.dataTreatmentPolicy]);

  React.useEffect(() => {
    registerFilledContactUserData(checkFilledContactUser(values));
    registerFillPrivacyPolicyAcepted(!!values?.termsAndConditions);
    registerFilledInputForAddress(!!values?.streetAddress1);
  }, []);
  return (
    <div>
      <S.Wrapper>
        {comeFromModal ? (
          <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
            <span className="fa-text-2xl fa-mb-8 fa-block fa-font-semibold">
              Editar dirección
            </span>
            <div style={{ width: "100%" }}>
              <S.FieldsGroup>
                {renderGroupLabel("Cliente")}
                <div className="fa-mb-4">
                  <FirstNameTextField {...fieldsProps} />
                </div>
                <PhoneTextField {...fieldsProps} />
                <div className="fa-block fa-mb-8" />
              </S.FieldsGroup>
              <S.FieldsGroup>
                {renderGroupLabel("Dirección")}
                <S.RowWithOneCell>
                  <div className="fa-mb-4">
                    <StreetAddress1
                      {...fieldsProps}
                      onChange={(value: IAddressAutocompleteValue) => {
                        setFieldValue("streetAddress1", value.text || "");
                        setFieldValue(
                          "latitude",
                          value.lat ? String(value.lat) : ""
                        );
                        setFieldValue(
                          "longitude",
                          value.lng ? String(value.lng) : ""
                        );
                        registerFilledInputForAddress(
                          !!(value.text && value.lat)
                        );
                      }}
                      onBlur={(e: React.FocusEvent) => {
                        registerFilledInputForAddress(
                          !!values?.streetAddress1?.length
                        );
                        handleBlur?.(e);
                      }}
                    />
                  </div>
                  <StreetAddress2 {...fieldsProps} />
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
              {renderGroupLabel("Cliente")}
              <S.RowWithTwoCells>
                <FirstNameTextField
                  {...fieldsProps}
                  required={true}
                  onBlur={handleOnBlurCheckContactUser}
                />
                <InputField
                  data-cy="addressFormDNI"
                  name="documentNumber"
                  placeholder="Ejemplo: 04123456"
                  label="Número de documento"
                  maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
                  value={!values?.documentNumber ? "" : values?.documentNumber}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  type="text"
                  autoComplete="documento"
                  error={
                    !!fieldErrors?.documentNumber
                      ? fieldErrors?.documentNumber[0].message
                      : ""
                  }
                  onBlur={handleOnBlurCheckContactUser}
                  inputSize="large"
                  onChange={e => {
                    const value = e.currentTarget?.value?.toUpperCase();
                    setFieldValue("documentNumber", value);
                  }}
                />
              </S.RowWithTwoCells>
              <S.RowWithTwoCells>
                <InputField
                  data-cy="addressFormEmail"
                  name="email"
                  placeholder="Ejemplo: juan@gmail.com"
                  label="Correo electrónico"
                  value={!values?.email ? "" : values?.email}
                  autoComplete="email"
                  type="email"
                  error={
                    !!fieldErrors?.email ? fieldErrors?.email[0].message : ""
                  }
                  inputSize="large"
                  onBlur={handleOnBlurCheckContactUser}
                  onChange={handleChange}
                />
                <PhoneTextField
                  {...fieldsProps}
                  onBlur={handleOnBlurCheckContactUser}
                />
              </S.RowWithTwoCells>
              <S.RowWithOneCell>
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
              </S.RowWithOneCell>
              <S.RowWithOneCell>
                <S.TreatmentPolicy>
                  <Checkbox
                    data-cy="checkoutPaymentPromoCodeCheckbox"
                    name="dataTreatmentPolicy"
                    checked={additionals}
                    onChange={handleAdditionals}
                  >
                    <DataTreatmentPolicyLink />
                  </Checkbox>
                </S.TreatmentPolicy>
              </S.RowWithOneCell>
            </S.FieldsGroup>
            <S.FieldsGroup>
              {renderGroupLabel("Dirección")}
              <S.RowWithOneCell>
                <StreetAddress1
                  {...fieldsProps}
                  temporaryError={temporaryStreeAddress1Error}
                  onChange={(
                    value: IAddressAutocompleteValue,
                    onlyText: boolean
                  ) => {
                    setFieldValue("streetAddress1", value.text || "");

                    if (onlyText) {
                      if (values.latitude) {
                        setFieldValue("latitude", undefined);
                        setFieldValue("longitude", undefined);
                      }
                    } else {
                      setFieldValue(
                        "latitude",
                        value.lat ? String(value.lat) : undefined
                      );
                      setFieldValue(
                        "longitude",
                        value.lng ? String(value.lng) : undefined
                      );
                    }

                    registerFilledInputForAddress(!!(value.text && value.lat));
                  }}
                  onBlur={(e: React.FocusEvent) => {
                    registerFilledInputForAddress(
                      !!values?.streetAddress1?.length
                    );
                    handleBlur?.(e);
                  }}
                />
              </S.RowWithOneCell>

              <S.RowWithOneCell>
                <S.Referencia alwaysShow>
                  <StreetAddress2 {...fieldsProps} />
                </S.Referencia>
              </S.RowWithOneCell>
              <Map
                location={getCoordinates()}
                onChangeLocation={(location, address) => {
                  setFieldValue("streetAddress1", address);
                  setFieldValue("latitude", String(location.lat));
                  setFieldValue("longitude", String(location.lng));
                  registerFilledInputForAddress(!!address?.length);
                }}
              />
              <S.RowWithTwoCells>
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
