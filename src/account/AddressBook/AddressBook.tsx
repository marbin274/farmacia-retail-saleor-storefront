import React from "react";
import "./scss/index.scss";

import { AddressFormModal, AddressGrid } from "@components/organisms";
import { AddressTypeEnum } from "@sdk/gqlTypes/globalTypes";
import { useDefaultUserAddress, useDeleteUserAddresss } from "@sdk/react";
import { ShopContext } from "../../components/ShopProvider/context";
import { citiesOptions } from "@temp/@next/components/organisms/CheckoutAddress/cities";

const AddressBook: React.FC<{
  user: any;
}> = ({ user }) => {
  const { defaultCountry, countries } = React.useContext(ShopContext);
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();

  if (user.addresses && user.addresses.length) {
    let i = 0;
    do {
      if (!user.addresses[i].isDefaultShippingAddress) {
        user.addresses.splice(i, 1);
      }
      i++;
    } while (user.addresses.length > 1);
  }

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
          submitBtnText={"Add"}
          title={"Add new address"}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText={"Guardar"}
          title={"Edit address"}
          {...{ countriesOptions: countries }}
          formId="address-form"
          citiesOptions={citiesOptions}
        />
      )}
    </div>
  );
};

export default AddressBook;
