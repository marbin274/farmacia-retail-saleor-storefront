import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import {
  InputSelectField,
  AddessAutocompleteField,
  MapField,
  InputTextField,
  TileRadioGroupField,
  ITileRadioOption,
} from './components/AddressForm2Fields/AddressForm2Fields';
import { useShopContext } from '@temp/components/ShopProvider/context';
import { Button, HomeIcon } from '@farmacia-retail/farmauna-components';
import { TOTAL_DISTRICT } from '@temp/core/config';
import { Icon } from '../../atoms';
import { GetShop_shop_availableDistricts } from '@temp/@sdk/queries/gqlTypes/GetShop';
import { SwapTypesToStrings } from '@temp/core/types';
import { isCoordinatesInsideBouds } from '@temp/core/utils';
import { IAddressForm, IAddressForm2Props } from './types';

const ADDRESS_TYPE_OPTIONS: ITileRadioOption[] = [
  {
    icon: <HomeIcon />,
    label: 'Mi casa',
    value: 'Mi casa',
  },
  {
    icon: <Icon name="work" size={16} viewPort={24} />,
    label: 'Mi trabajo',
    value: 'Mi trabajo',
  },
  {
    icon: <Icon name="category2" size={16} viewPort={24} />,
    label: 'Otros',
    value: 'Otros',
    withInput: true,
  },
];

// TODO: cambiar el nombre
export const AddressForm2: FC<IAddressForm2Props> = ({ address, onSubmit }) => {
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
    const isInsideBounds = isCoordinatesInsideBouds(
      Number(values.latitude),
      Number(values.longitude),
      getCityPolygon(values.city)
    );

    if (!isInsideBounds) {
      setSubmitting(false);
      return;
    }

    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        alias: address ? 'Mi casa' : '',
        city: address
          ? availableDistricts.find((x) => x.name === address.city)
          : undefined,
        latitude: address ? String(address.latitude) : '',
        longitude: address ? String(address.longitude) : '',
        streetAddress1: address ? address.streetAddress1 : '',
        streetAddress2: address ? address.streetAddress2 : '',
      }}
      validate={validate}
      onSubmit={handleSubbmit}
    >
      {({ handleSubmit, values }) => (
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
                options={ADDRESS_TYPE_OPTIONS}
              />
            </div>
          </div>
          <Button className="fa-mb-4 fa-w-full" onClick={() => handleSubmit()}>
            Guardar dirección
          </Button>
        </>
      )}
    </Formik>
  );
};
