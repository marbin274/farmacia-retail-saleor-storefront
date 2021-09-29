import { IAddressForm } from '@app/types/IAddressForm';
import { DOCUMENT_NUMBER_MAX_LENGTH } from '@app/utils/schemasConfig';
import {
  Checkbox,
  DataTreatmentPolicyLink,
  ErrorForm,
  TermsAndConditionsLink,
} from '@components/atoms';
import {
  AddressAutocomplete,
  Alert,
  IAddressAutocompleteRef,
  IAddressAutocompleteValue,
  InputSelect,
  Map,
} from '@components/molecules';
import {
  InformationIcon,
  InputField,
} from '@farmacia-retail/farmauna-components';
import { launchCheckoutFilledInputForAddressEvent } from '@sdk/gaConfig';
import { useDistrictSelected } from '@app/hooks';
import { TOTAL_DISTRICT } from '@temp/core/config';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { useShopContext } from '../../ShopProvider/context';

export interface IAddressSectionProps {
  fieldErrors: FormikErrors<IAddressForm>;
  handleChange(e: React.ChangeEvent<any>): void;
  setFieldValue(field: string, value: any): void;
  setValues(
    values: React.SetStateAction<IAddressForm>,
    shouldValidate?: boolean
  ): Promise<void> | Promise<FormikErrors<IAddressForm>>;
  touched: FormikTouched<IAddressForm>;
  values: IAddressForm;
  isLogged: boolean;
}

export const AddressSection: React.FC<IAddressSectionProps> = ({
  fieldErrors,
  handleChange,
  setFieldValue,
  setValues,
  touched,
  values,
  isLogged,
}) => {
  const [, setDistrict] = useDistrictSelected();
  const { availableDistricts } = useShopContext();

  const districts = React.useMemo(
    () =>
      availableDistricts
        .filter((it) => it.isActive)
        .map((it) => ({ id: it.id, name: it.name })),
    [availableDistricts]
  );
  const registerFilledInputForAddressRef = React.useRef<boolean>(false);
  const ref = React.useRef<IAddressAutocompleteRef>();

  const districtSelected = React.useMemo(
    () => availableDistricts.find((it) => it.id === values.district),
    [values.district]
  );

  const registerFilledInputForAddress = (isChecked: boolean) => {
    if (!registerFilledInputForAddressRef.current && isChecked) {
      registerFilledInputForAddressRef.current = true;
      launchCheckoutFilledInputForAddressEvent();
    }
  };

  const handleChangeAddress = (address: string, lat: number, lng: number) => {
    setValues((prev: IAddressForm) => ({
      ...prev,
      streetAddress1: address || '',
      latitude: lat,
      longitude: lng,
      shippingMethod: undefined,
      slotId: undefined,
      deliveryDate: undefined,
      isScheduled: false,
      scheduleDate: undefined,
    }));
    registerFilledInputForAddress(!!(address && lat));
  };

  return (
    <>
      <div className="fa-pb-4 fa-w-full">
        <span className="fa-text-xl fa-mb-6 fa-block fa-font-semibold">
          Cliente
        </span>

        {isLogged ? (
          <InputField
            data-testid="addressFormPhone"
            name="phone"
            placeholder="Ejem: 912345678"
            maxLength={9}
            role="textbox"
            label="Número de celular"
            value={values.phone}
            type="tel"
            error={touched.phone && fieldErrors?.phone}
            pattern="\d*"
            onChange={handleChange}
            inputSize="large"
          />
        ) : (
          <div className="fa-grid fa-grid-cols-1 fa-gap-6 fa-mt-10 md:fa-grid-cols-2">
            <InputField
              autoComplete="off"
              data-testid="addressFormFirstName"
              name="firstName"
              label={`Nombre completo`}
              placeholder="Ejemplo: Juan Perez"
              role="textbox"
              value={values.firstName}
              error={touched.firstName && fieldErrors?.firstName}
              onChange={handleChange}
              inputSize="large"
            />
            <InputField
              data-testid="addressFormDNI"
              inputMode="numeric"
              name="documentNumber"
              placeholder="Ejemplo: 04123456"
              label="Número de documento"
              maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
              value={values.documentNumber}
              pattern="[0-9]*"
              role="textbox"
              type="text"
              error={touched.documentNumber && fieldErrors?.documentNumber}
              inputSize="large"
              onChange={(e) =>
                setFieldValue(
                  'documentNumber',
                  e.currentTarget?.value?.toUpperCase()
                )
              }
            />
            <InputField
              data-testid="addressFormEmail"
              name="email"
              placeholder="Ejemplo: juan@gmail.com"
              label="Correo electrónico"
              value={values.email}
              role="textbox"
              type="email"
              error={touched.email && fieldErrors?.email}
              inputSize="large"
              onChange={handleChange}
            />
            <InputField
              data-testid="addressFormPhone"
              name="phone"
              placeholder="Ejem: 912345678"
              maxLength={9}
              role="textbox"
              label="Número de celular"
              value={values.phone}
              type="tel"
              error={touched.phone && fieldErrors?.phone}
              pattern="\d*"
              onChange={handleChange}
              inputSize="large"
            />
          </div>
        )}
      </div>
      <div className="fa-mb-6 fa-w-full">
        <Checkbox
          data-testid="addressFormTermsAndConditions"
          error={!!fieldErrors!.termsAndConditions}
          name="termsAndConditions"
          role="checkbox"
          checked={values.termsAndConditions}
          onChange={() => {
            setFieldValue('termsAndConditions', !values.termsAndConditions);
          }}
        >
          <TermsAndConditionsLink />
        </Checkbox>
        {touched.termsAndConditions && fieldErrors.termsAndConditions && (
          <ErrorForm>{fieldErrors!.termsAndConditions}</ErrorForm>
        )}
      </div>
      <div className="fa-mb-6 fa-w-full">
        <Checkbox
          data-testid="checkoutPaymentPromoCodeCheckbox"
          name="dataTreatmentPolicy"
          checked={!!values.dataTreatmentPolicy}
          role="checkbox"
          onChange={() => {
            setFieldValue('dataTreatmentPolicy', !values.dataTreatmentPolicy);
          }}
        >
          <DataTreatmentPolicyLink />
        </Checkbox>
      </div>
      <div className="fa-pb-4 fa-w-full">
        <span className="fa-text-xl fa-mb-6 fa-block fa-font-semibold">
          Dirección
        </span>
        <div className="fa-mb-6">
          <AddressAutocomplete
            autoComplete="off"
            data-testid="addressAutocomplete"
            name="streetAddress1"
            label="Dirección"
            role="textbox"
            placeholder="Ejemplo: Av. Arenales 213"
            value={{
              lat: values.latitude ? Number(values.latitude) : undefined,
              lng: values.longitude ? Number(values.longitude) : undefined,
              text: values.streetAddress1 || '',
            }}
            onChangeValue={(value: IAddressAutocompleteValue) =>
              handleChangeAddress(value.text, value.lat, value.lng)
            }
            error={
              touched.streetAddress1 &&
              (fieldErrors?.streetAddress1 || fieldErrors?.latitude)
            }
            inputSize="large"
            ref={ref}
          />
          {!touched.streetAddress1 && (
            <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
              Escribe tu dirección y elige una de las opciones desplegadas
            </span>
          )}
        </div>
        <Map
          location={{ lat: values.latitude, lng: values.longitude }}
          onChangeLocation={(location, address) =>
            handleChangeAddress(address, location.lat, location.lng)
          }
        />
        <Alert
          type="info"
          message="Verifica tu ubicación en el mapa"
          icon={<InformationIcon />}
          className="fa-mt-2"
        />
      </div>
      <div className="fa-pb-4 fa-w-full">
        <InputField
          data-testid="addressFormStreetAddress2"
          name="streetAddress2"
          placeholder="Ejem: Colegio, edificio, avenida"
          label="Referencia"
          role="textbox"
          value={values.streetAddress2}
          error={touched.streetAddress2 && fieldErrors?.streetAddress2}
          onChange={handleChange}
          inputSize="large"
        />
      </div>
      <div className="fa-pb-4 fa-w-full">
        <div className="fa-flex fa-flex-col">
          <InputSelect
            inputProps={{
              'data-testid': 'addressFormCity',
              name: 'district',
              placeholder: !districtSelected ? 'Selecciona tu distrito' : '',
            }}
            name="district"
            label="Distrito"
            options={districts}
            value={districtSelected}
            optionLabelKey="name"
            optionValueKey="id"
            errors={
              touched.district &&
              (fieldErrors?.district
                ? [{ message: fieldErrors.district, field: 'district' }]
                : undefined)
            }
            onChange={(value: any) => {
              setDistrict(availableDistricts.find((it) => it.id === value.id));
              setValues({
                ...values,
                district: value.id,
                shippingMethod: undefined,
                slotId: undefined,
                deliveryDate: undefined,
                isScheduled: false,
                scheduleDate: undefined,
              });
            }}
          />
          <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
            Llegamos a {TOTAL_DISTRICT} distritos de Lima
          </span>
        </div>
      </div>
    </>
  );
};
