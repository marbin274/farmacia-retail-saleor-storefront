import { convertIFormErrorsToObjectErrors } from "@app/utils/errorsManagement";
import { DOCUMENT_NUMBER_MAX_LENGTH } from "@app/utils/schemasConfig";
import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorMessage,
  TermsAndConditionsLink
} from "@components/atoms";
import { IAddressAutocompleteValue, TextField } from "@components/molecules";
import { IAddressWithEmail } from "@temp/@next/types";
import {
  launchCheckoutFilledContactUserDataEvent,
  launchCheckoutFilledInputForAddressEvent, launchCheckoutPrivacyPolicyAceptedEvent
} from "@temp/@sdk/gaConfig";
import React, { useState } from "react";
import {
  CitySelect,
  FirstNameTextField,
  PhoneTextField,
  StreetAddress1,
  StreetAddress2
} from "./AddressFormContent/AddressFormFields";
import Map from "./AddressFormContent/Map";
import { IFieldsProps, ISelectFieldsProps } from "./AddressFormContent/types";
import * as S from "./styles";
import { PropsWithFormik } from "./types";


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
}

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
}) => {
  const initialTermAndconditions = values && values?.termsAndConditions ? values?.termsAndConditions : false;
  const registerFilledContactUserDataRef = React.useRef<boolean>(false);
  const registerPrivacyPolicyAceptedRef = React.useRef<boolean>(false);
  const registerFilledInputForAddressRef = React.useRef<boolean>(false);
  const [privacyAndPolicies, setPrivacyAndPolicies] = useState<boolean>(initialTermAndconditions);

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

  const registerFilledContactUserData = (isChecked: boolean)=>{
    if (!registerFilledContactUserDataRef.current && isChecked) {
      registerFilledContactUserDataRef.current = true;
      launchCheckoutFilledContactUserDataEvent();
    }  
  }

  const registerFillPrivacyPolicyAcepted = (isChecked: boolean)=>{
    if (!registerPrivacyPolicyAceptedRef.current && isChecked) {
      registerPrivacyPolicyAceptedRef.current = true;
      launchCheckoutPrivacyPolicyAceptedEvent();
    }  
  } 

  const registerFilledInputForAddress = (isChecked: boolean)=>{
    if (!registerFilledInputForAddressRef.current && isChecked) {
      registerFilledInputForAddressRef.current = true;
      launchCheckoutFilledInputForAddressEvent();
    }  
  }

  const handleOnBlurCheckContactUser = (e: React.FocusEvent)=>{
    registerFilledContactUserData(checkFilledContactUser(values));
    handleBlur?.(e);
  }

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

  const renderGroupLabel = (id: number, title: string) => (
    <S.GroupLabel>
      <S.GroupLabelIndex>{id}</S.GroupLabelIndex>
      <S.GroupLabelTitle>{title}</S.GroupLabelTitle>
    </S.GroupLabel>
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
    setPrivacyAndPolicies(!!values?.termsAndConditions);
  }, [values?.termsAndConditions]);

  React.useEffect(() => {
    setAdditionals(!!values?.dataTreatmentPolicy);
  }, [values?.dataTreatmentPolicy]);

  React.useEffect(()=>{

    registerFilledContactUserData(checkFilledContactUser(values));
    registerFillPrivacyPolicyAcepted(!!values?.termsAndConditions);
    registerFilledInputForAddress(!!values?.streetAddress1);

  }, []);

  return (
    <div>
      <S.Wrapper>
        {comeFromModal ? (
          <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
            <div style={{ width: "100%" }}>
              <S.FieldsGroup>
                {renderGroupLabel(1, "Cliente")}
                <FirstNameTextField
                  {...fieldsProps}
                />
                <PhoneTextField  {...fieldsProps} />
              </S.FieldsGroup>
              <S.FieldsGroup>
                {renderGroupLabel(2, "Dirección")}
                <S.RowWithOneCell>
                  <StreetAddress1  {...fieldsProps} />
                  <StreetAddress2  {...fieldsProps} />
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
                  {...fieldsProps}
                  required={true}
                  onBlur={handleOnBlurCheckContactUser}
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
                  onBlur={handleOnBlurCheckContactUser}
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
              {renderGroupLabel(2, "Dirección de entrega")}
              <S.RowWithTwoCells>
                <StreetAddress1 
                  {...fieldsProps}
                  onChange={(value: IAddressAutocompleteValue)=>{
                    setFieldValue("streetAddress1", value.text || "");
                    setFieldValue("latitude", value.lat ? String(value.lat) : "");
                    setFieldValue("longitude", value.lng ? String(value.lng) : "");
                    registerFilledInputForAddress(!!(value.text && value.lat));
                  }}
                  onBlur={(e: React.FocusEvent)=>{
                    registerFilledInputForAddress(!!(values?.streetAddress1?.length));
                    handleBlur?.(e);
                  }}
                 />
                <S.Referencia>
                  <StreetAddress2 {...fieldsProps} />
                </S.Referencia>
              </S.RowWithTwoCells>
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
                <S.Referencia mobile>
                  <StreetAddress2 {...fieldsProps} />
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
