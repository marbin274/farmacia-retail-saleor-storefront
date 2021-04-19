import React from "react";
import "./scss/index.scss";

import { AddressFormModal, AddressGrid } from "@components/organisms";
import { AddressTypeEnum, CountryCode } from "@sdk/gqlTypes/globalTypes";
import { useDefaultUserAddress, useDeleteUserAddresss, useUpdateUserAddress } from "@sdk/react";
import { ShopContext } from "../../components/ShopProvider/context";
import { citiesOptions } from "@temp/@next/components/organisms/CheckoutAddress/cities";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";

const AddressBook: React.FC<{
  user: UserDetails_me;
}> = ({ user }) => {
  const { defaultCountry, countries } = React.useContext(ShopContext);
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();
  const [setUpdateUserAddress] = useUpdateUserAddress();

  const userAddresses = user.addresses.map(address => {
    const addressToDisplay: any = { address: { ...address } };

    addressToDisplay.onEdit = () => {
      setDisplayEditModal(true);
      setAddressData({
        address,
        id: address.id,
      });
    };

    addressToDisplay.onRemove = () =>
      setDeleteUserAddress({
        addressId: address.id,
      });

    addressToDisplay.setDefault = (type: string) => {
      setDefaultUserAddress({
        id: address.id,
        type:
          type === "BILLING"
            ? AddressTypeEnum.BILLING
            : AddressTypeEnum.SHIPPING,
      });      
    };

    addressToDisplay.removeDefault = () => {
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
          latitude: address.latitude,
          longitude: address.longitude,
          phone: address.phone,
          postalCode: address.postalCode,
          streetAddress1: address.streetAddress1,
          streetAddress2: address.streetAddress2,
        },
      });
    }
    return addressToDisplay;
  });

  return (
    <div className="address-book-container">
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
          citiesOptions={citiesOptions}
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText="Guardar"
          title="Editar dirección"
          {...{ countriesOptions: countries }}
          formId="address-form"
          citiesOptions={citiesOptions}
        />
      )}
    </div>
  );
};

export default AddressBook;
