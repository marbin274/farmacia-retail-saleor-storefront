import React from 'react';

import { useCreateUserAddress } from '@sdk/react';
// import { useCreateUserAddress, useUpdateUserAddress } from '@sdk/react';

import { Modal } from '../Modal';

import { CountryCode } from '@sdk/gqlTypes/globalTypes';
import { IProps } from './types';
import { AddressForm2, IAddressForm } from '../AddressForm2';

export const AddressFormModal: React.FC<IProps> = ({
  hideModal,
  submitBtnText,
  target,
  title,
  userId,
  address,
  districtsOptions,
  formId,
  ...props
}) => {
  const [show, setShow] = React.useState(true);
  // let errors: any[] | undefined = [];

  const [
    setCreatUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  // const [
  //   setUpdateUserAddress,
  //   { data: updateData, error: addressUpdateErrors },
  // ] = useUpdateUserAddress();

  // if (addressCreateErrors) {
  //   errors = addressCreateErrors.extraInfo.userInputErrors;
  // }

  // if (addressUpdateErrors) {
  //   errors = addressUpdateErrors?.extraInfo?.userInputErrors;
  // }

  // React.useEffect(() => {
  //   if (
  //     (createData && !addressCreateErrors) ||
  //     (updateData && !addressUpdateErrors)
  //   ) {
  //     hideModal();
  //   }
  // }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  React.useEffect(() => {
    if (createData && !addressCreateErrors) {
      hideModal();
    }
  }, [createData, addressCreateErrors]);

  const handleSubmit = (values: IAddressForm) => {
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

    // if (!!userId) {
    //   const _data: IAddressWithEmail = {
    //     city: data?.city,
    //     firstName: data?.firstName,
    //     streetAddress1: data?.streetAddress1,
    //     streetAddress2: data?.streetAddress2,
    //   };
    //   setCreatUserAddress({
    //     input: {
    //       ..._data,
    //       country: CountryCode.PE,
    //       latitude: data!.latitude ? Number(data!.latitude) : undefined,
    //       longitude: data!.longitude
    //         ? Number(data!.longitude)
    //         : undefined,
    //     },
    //   });
    // } else {
    //   setUpdateUserAddress({
    //     id: address!.id,
    //     input: {
    //       ...data,
    //       country: CountryCode.PE,
    //       latitude: data!.latitude ? Number(data!.latitude) : undefined,
    //       longitude: data!.longitude
    //         ? Number(data!.longitude)
    //         : undefined,
    //     },
    //   });
    // }
  };

  return (
    <Modal
      title={title}
      hide={() => {
        hideModal();
        setShow(false);
      }}
      formId={formId}
      disabled={false}
      show={show}
      target={target}
      submitBtnText={submitBtnText}
    >
      <AddressForm2 onSubmit={handleSubmit} />
    </Modal>
  );
};
