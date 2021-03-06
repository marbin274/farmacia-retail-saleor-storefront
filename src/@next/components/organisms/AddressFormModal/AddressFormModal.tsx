import {
  AddressAutocompleteField,
  InputSelectField,
  InputTextField,
  MapField,
  TileRadioGroupField,
} from '@components/molecules';
import { useShopContext } from '../../organisms/ShopProvider/context';
import { Button } from '@farmacia-retail/farmauna-components';
import { GetShop_shop_availableDistricts } from '@temp/@sdk/queries/gqlTypes/GetShop';
import { TOTAL_DISTRICT } from '@temp/core/config';
import { SwapTypesToStrings } from '@temp/core/types';
import { isCoordinatesInsideBouds } from '@temp/core/utils';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { Modal } from '../Modal';
import { getAddressTypeOptions } from './data';
import { IAddressForm, IAddressFormModalProps } from './types';

export const AddressFormModal: React.FC<IAddressFormModalProps> = ({
  address,
  hideModal,
  loading,
  onSubmit,
  show,
  title,
}) => {
  const { availableDistricts } = useShopContext();

  const getCityPolygon = (city: GetShop_shop_availableDistricts) => {
    return city?.warehouse?.polygon
      ? JSON.parse(city.warehouse.polygon)
      : undefined;
  };

  const validate = (values: IAddressForm) => {
    const errors: SwapTypesToStrings<IAddressForm> = {};

    if (!values.city?.name) {
      errors.city = 'Selecciona el distrito de entrega';
    }

    if (!values.streetAddress1) {
      errors.streetAddress1 =
        'Escribe tu dirección y elige una de las opciones desplegadas';
    }

    if (!values.latitude) {
      errors.latitude = 'Obligatorio';
    }

    return errors;
  };

  const handleSubbmit = (
    values: IAddressForm,
    { setSubmitting }: FormikHelpers<IAddressForm>
  ) => {
    onSubmit(values);
    setSubmitting(false);
  };

  const isSubmitDisabled = (
    values: IAddressForm,
    isValid: boolean,
    dirty: boolean
  ) => {
    if (loading || (!dirty && !address) || !isValid) {
      return true;
    }

    return !isCoordinatesInsideBouds(
      Number(values.latitude),
      Number(values.longitude),
      getCityPolygon(values.city)
    );
  };

  return (
    <Modal
      title={title}
      hide={() => {
        hideModal();
      }}
      disabled={false}
      show={show}
    >
      <Formik
        initialValues={{
          alias: address ? address.alias : '',
          city: address
            ? availableDistricts.find(
                (x) => x.name.toLowerCase() === address.city.toLowerCase()
              )
            : undefined,
          latitude: address ? String(address.latitude) : '',
          longitude: address ? String(address.longitude) : '',
          streetAddress1: address ? address.streetAddress1 : '',
          streetAddress2: address ? address.streetAddress2 : '',
        }}
        validate={validate}
        onSubmit={handleSubbmit}
      >
        {({ handleSubmit, isValid, values, dirty }) => (
          <>
            <div className="fa-mt-4">
              <div className="fa-mb-4">
                <InputSelectField
                  name="city"
                  label="Distrito"
                  options={availableDistricts}
                  optionLabelKey="name"
                  optionValueKey="name"
                  placeholder="Selecciona tu distrito"
                />
                <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
                  Llegamos a {TOTAL_DISTRICT} distritos de Lima
                </span>
              </div>
              <div className="fa-mb-4">
                <AddressAutocompleteField
                  name="streetAddress1"
                  label="Buscar dirección"
                  placeholder="Ejemplo: Av. Arenales 213"
                  inputSize="large"
                  helperText="Escribe tu dirección y elige una de las opciones desplegadas"
                />
              </div>
              <div className="fa-mb-4">
                <MapField
                  addressName="streetAddress1"
                  geoJsonBounds={getCityPolygon(values.city)}
                />
              </div>
              <div className="fa-mb-4">
                <InputTextField
                  name="streetAddress2"
                  placeholder="Ejem: Colegio, edificio, avenida"
                  label="Referencia"
                  autoComplete="address-line2"
                  inputSize="large"
                />
              </div>
              <div className="fa-mb-4">
                <p className="fa-text-sm">Personaliza tu dirección</p>
                <p className="fa-text-neutral-dark fa-text-sm fa-mb-2">
                  Selecciona una opción
                </p>
                <TileRadioGroupField
                  name="alias"
                  options={getAddressTypeOptions()}
                />
              </div>
            </div>
            <Button
              className="fa-mb-4 fa-w-full"
              onClick={() => handleSubmit()}
              disabled={isSubmitDisabled(values, isValid, dirty)}
            >
              {loading ? 'Cargando' : 'Guardar dirección'}
            </Button>
          </>
        )}
      </Formik>
    </Modal>
  );
};
