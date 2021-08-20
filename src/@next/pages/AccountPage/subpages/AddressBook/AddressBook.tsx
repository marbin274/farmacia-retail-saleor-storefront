import React, { useEffect, useState } from 'react';

import { AddressFormModal, AddressGrid } from '@components/organisms';
import { AddressTypeEnum, CountryCode } from '@sdk/gqlTypes/globalTypes';
import {
  useCreateUserAddress,
  useDefaultUserAddress,
  useDeleteUserAddresss,
  useUpdateUserAddress,
  useUserDetails,
} from '@sdk/react';
import AccountLayout from '@app/pages/AccountPage/AccountLayout';
import { IAddressForm } from '@temp/@next/components/organisms/AddressFormModal/types';
import { UserDetails_me_addresses } from '@temp/@sdk/queries/gqlTypes/UserDetails';

export const AddressBook: React.FC = () => {
  const { data: user } = useUserDetails();
  const [showFormModal, setShowFormModal] = useState(false);
  const [addressToUpdate, setAddressToUpdate] =
    useState<UserDetails_me_addresses>(null);
  const [setDefaultUserAddress, { loading: setDefaultLoading }] =
    useDefaultUserAddress();
  const [setDeleteUserAddress, { loading: deleteLoading }] =
    useDeleteUserAddresss();
  const [
    setCreatUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  const [
    setUpdateUserAddress,
    { data: updateData, error: addressUpdateErrors },
  ] = useUpdateUserAddress();

  useEffect(() => {
    if (
      (createData && !addressCreateErrors) ||
      (updateData && !addressUpdateErrors)
    ) {
      setShowFormModal(false);
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  const handleSubmit = (values: IAddressForm) => {
    if (addressToUpdate?.id) {
      setUpdateUserAddress({
        id: addressToUpdate?.id,
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

  const handleDelete = (id: string) => {
    if (deleteLoading) {
      return;
    }

    setDeleteUserAddress({
      addressId: id,
    });
  };

  const handleSetDefault = (id: string) => {
    if (setDefaultLoading) {
      return;
    }

    setDefaultUserAddress({
      id,
      type: AddressTypeEnum.SHIPPING,
    });

    setDefaultUserAddress({
      id,
      type: AddressTypeEnum.BILLING,
    });
  };

  return (
    <AccountLayout>
      <div className="fa-w-full">
        <AddressGrid
          addresses={user?.addresses}
          onClickAdd={() => {
            setAddressToUpdate(undefined);
            setShowFormModal(true);
          }}
          onClickDelete={handleDelete}
          onClickEdit={(address) => {
            setAddressToUpdate(address);
            setShowFormModal(true);
          }}
          onClickSetDefault={handleSetDefault}
        />
        {showFormModal && (
          <AddressFormModal
            hideModal={() => {
              setShowFormModal(false);
            }}
            title={
              addressToUpdate ? 'Editar dirección' : 'Agregar nueva dirección'
            }
            show={showFormModal}
            address={addressToUpdate}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </AccountLayout>
  );
};

export default AddressBook;
