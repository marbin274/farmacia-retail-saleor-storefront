import React, { FC } from 'react';
import { Formik } from 'formik';
import { InputSelectField } from './components/AddressForm2Fields/AddressForm2Fields';
import { useShopContext } from '@temp/components/ShopProvider/context';
import { Button } from '@farmacia-retail/farmauna-components';

// TODO: cambiar el nombre
// TODO: aún en progreso
export const AddressForm2: FC = () => {
  const { availableDistricts } = useShopContext();

  const handleSubbmit = (values: any) => {
    // TODO: handle :v
  };

  return (
    <Formik
      initialValues={{
        city: undefined,
      }}
      onSubmit={handleSubbmit}
    >
      {(props) => (
        <>
          <InputSelectField
            name="city"
            label="Distrito"
            options={availableDistricts}
            optionLabelKey="name"
            optionValueKey="name"
          />
          <Button onClick={() => props.handleSubmit()}>A ver</Button>
        </>
      )}
    </Formik>
  );
};
