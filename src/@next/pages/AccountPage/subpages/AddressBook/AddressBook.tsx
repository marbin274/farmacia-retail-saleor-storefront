import React from "react";

import { AddressFormModal, AddressGrid } from "@components/organisms";
import { AddressTypeEnum, CountryCode } from "@sdk/gqlTypes/globalTypes";
import { useDefaultUserAddress, useDeleteUserAddresss, useUpdateUserAddress } from "@sdk/react";
import { useShopContext } from "@temp/components/ShopProvider/context";
import { UserDetails_me } from "@sdk/queries/gqlTypes/UserDetails";
import { IAddressBookDisplay, IAddressWithAddressType } from "@temp/@next/types";
import { removeCountryCodeInPhoneNumber } from "@temp/@next/utils/addresForm";
import { maybe } from "@temp/@next/utils/misc";

const AddressBook: React.FC<{
  user: UserDetails_me;
}> = ({ user }) => {
  const { availableDistricts, defaultCountry, countries } = useShopContext();
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();
  const [setUpdateUserAddress] = useUpdateUserAddress();

  const districtsOptions = maybe(() => availableDistricts.map(x => (x.name || '')), []);

  const userAddresses = maybe(()=>user.addresses.map(it => {
    const address: IAddressWithAddressType = { ...it, phone: removeCountryCodeInPhoneNumber(it.phone || '') };
    const addressToDisplay: IAddressBookDisplay = {
      address,
      onEdit: () => {
        setDisplayEditModal(true);
        setAddressData({
          address,
          id: address.id,
        });
      },
      onRemove: () => setDeleteUserAddress({
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
            type === "BILLING"
              ? AddressTypeEnum.BILLING
              : AddressTypeEnum.SHIPPING,
        });
      },
    };
    return addressToDisplay;
  }), []);

  return (
    <div className="fa-w-full">
      <AddressGrid
        addresses={userAddresses}
        addNewAddress={() => {
          setDisplayNewModal(true);
        }}
      />
      {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          userId={user.id}
          {...{ defaultValue: defaultCountry ? defaultCountry : {} }}
          submitBtnText="Guardar"
          title="Agregar nueva dirección"
          {...{ countriesOptions: countries }}
          formId="address-form"
          districtsOptions={districtsOptions}
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText="Guardar"
          {...{ countriesOptions: countries }}
          formId="address-form"
          districtsOptions={districtsOptions}
        />
      )}
    </div>
  );
};

export default AddressBook;
