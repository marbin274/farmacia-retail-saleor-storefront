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
import {
  IAddressBookDisplay,
  IAddressWithAddressType,
} from '@temp/@next/types';
import { removeCountryCodeInPhoneNumber } from '@temp/@next/utils/addresForm';
import { maybe } from '@temp/@next/utils/misc';
import AccountLayout from '@app/pages/AccountPage/AccountLayout';
import { IAddressForm } from '@temp/@next/components/organisms/AddressFormModal/types';

export const AddressBook: React.FC = () => {
  const { data: user } = useUserDetails();
  const [displayNewModal, setDisplayNewModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [addressData, setAddressData] = useState<IAddressWithAddressType>(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();
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
      setDisplayNewModal(false);
      setDisplayEditModal(false);
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  const userAddresses = maybe(
    () =>
      user.addresses.map((it) => {
        const address: IAddressWithAddressType = {
          ...it,
          phone: removeCountryCodeInPhoneNumber(it.phone || ''),
        };
        const addressToDisplay: IAddressBookDisplay = {
          address,
          onEdit: () => {
            setAddressData(address);
            setDisplayEditModal(true);
          },
          onRemove: () =>
            setDeleteUserAddress({
              addressId: address.id,
            }),
          removeDefault: () => {
            setUpdateUserAddress({
              id: address.id,
              input: {
                city: address.city,
                companyName: address.companyName,
                country: CountryCode.PE,
                countryArea: address.countryArea,
                firstName: address.firstName,
                isDefault: false,
                lastName: address.lastName,
                latitude: Number(address.latitude),
                longitude: Number(address.longitude),
                phone: address.phone,
                postalCode: address.postalCode,
                streetAddress1: address.streetAddress1,
                streetAddress2: address.streetAddress2,
              },
            });
          },
          setDefault: (type: string) => {
            setDefaultUserAddress({
              id: address.id,
              type:
                type === 'BILLING'
                  ? AddressTypeEnum.BILLING
                  : AddressTypeEnum.SHIPPING,
            });
          },
        };
        return addressToDisplay;
      }),
    []
  );

  const handleSubmit = (values: IAddressForm) => {
    if (addressData?.id) {
      setUpdateUserAddress({
        id: addressData?.id,
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
    <AccountLayout>
      <div className="fa-w-full">
        <AddressGrid
          addresses={userAddresses}
          addNewAddress={() => {
            setAddressData(undefined);
            setDisplayNewModal(true);
          }}
        />
        {displayNewModal && (
          <AddressFormModal
            hideModal={() => {
              setDisplayNewModal(false);
            }}
            title="Agregar nueva dirección"
            show={displayNewModal}
            onSubmit={handleSubmit}
          />
        )}
        {displayEditModal && (
          <AddressFormModal
            hideModal={() => {
              setDisplayEditModal(false);
            }}
            show={displayEditModal}
            address={addressData}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </AccountLayout>
  );
};

export default AddressBook;
