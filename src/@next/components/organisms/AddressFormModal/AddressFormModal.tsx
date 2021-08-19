import React from 'react';
import { useCreateUserAddress, useUpdateUserAddress } from '@sdk/react';
import { Modal } from '../Modal';
import { CountryCode } from '@sdk/gqlTypes/globalTypes';
import { IProps } from './types';
import { AddressForm, IAddressForm } from './components/AddressForm';

export const AddressFormModal: React.FC<IProps> = ({
  hideModal,
  title,
  address,
  show,
}) => {
  // let errors: any[] | undefined = [];

  const [
    setCreatUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  const [
    setUpdateUserAddress,
    { data: updateData, error: addressUpdateErrors },
  ] = useUpdateUserAddress();

  // if (addressCreateErrors) {
  //   errors = addressCreateErrors.extraInfo.userInputErrors;
  // }

  // if (addressUpdateErrors) {
  //   errors = addressUpdateErrors?.extraInfo?.userInputErrors;
  // }

  React.useEffect(() => {
    if (
      (createData && !addressCreateErrors) ||
      (updateData && !addressUpdateErrors)
    ) {
      hideModal();
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  const handleSubmit = (values: IAddressForm) => {
    if (address?.id) {
      setUpdateUserAddress({
        id: address.id,
        input: {
          alias: values.alias,
          city: values.city.name,
          country: CountryCode.PE,
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
          streetAddress1: values.streetAddress1,
          streetAddress2: values.streetAddress2,
        },
      });
      return;
    }

    setCreatUserAddress({
      input: {
        alias: values.alias,
        city: values.city.name,
        country: CountryCode.PE,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        streetAddress1: values.streetAddress1,
        streetAddress2: values.streetAddress2,
      },
    });
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
      <AddressForm onSubmit={handleSubmit} address={address?.address} />
    </Modal>
  );
};
