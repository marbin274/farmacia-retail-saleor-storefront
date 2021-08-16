import React, { FC } from 'react';
import { Formik } from 'formik';
import {
  InputSelectField,
  AddessAutocompleteField,
  MapField,
  InputTextField,
} from './components/AddressForm2Fields/AddressForm2Fields';
import { useShopContext } from '@temp/components/ShopProvider/context';
import { Button } from '@farmacia-retail/farmauna-components';
import { TOTAL_DISTRICT } from '@temp/core/config';

type IAddressForm = {
  city?: any;
  latitude?: string;
  longitude?: string;
  streetAddress1?: string;
  streetAddress2?: string;
};

const initialValues: IAddressForm = {
  city: undefined,
  streetAddress1: '',
  longitude: '',
  latitude: '',
  streetAddress2: '',
};

// TODO: cambiar el nombre
// TODO: aún en progreso
export const AddressForm2: FC = () => {
  const { availableDistricts } = useShopContext();

  const validate = (values: IAddressForm) => {
    const errors: Partial<IAddressForm> = {};

    if (!values.streetAddress1) {
      errors.streetAddress1 = 'test error';
    }

    return errors;
  };

  const handleSubbmit = (values: IAddressForm) => {
    // TODO: handle
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubbmit}
    >
      {(props) => (
        <>
          <div className="fa-mt-4">
            <div className="fa-mb-4">
              <InputSelectField
                name="city"
                label="Distrito"
                options={availableDistricts}
                optionLabelKey="name"
                optionValueKey="name"
              />
              <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
                Llegamos a {TOTAL_DISTRICT} distritos de Lima
              </span>
            </div>
            <div className="fa-mb-4">
              <AddessAutocompleteField
                name="streetAddress1"
                label="Buscar Dirección"
                placeholder="Ejemplo: Av. Arenales 213"
                inputSize="large"
                helperText="Escribe tu dirección y elige una de las opciones desplegadas"
              />
            </div>
            <div className="fa-mb-4">
              <MapField addressName="streetAddress1" />
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
          </div>
          <Button
            className="fa-mb-4 fa-w-full"
            onClick={() => props.handleSubmit()}
          >
            Guardar dirección
          </Button>
        </>
      )}
    </Formik>
  );
};
