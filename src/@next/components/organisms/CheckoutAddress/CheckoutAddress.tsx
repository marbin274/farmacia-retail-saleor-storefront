import React from "react";

import { filterNotEmptyArrayItems } from "@utils/misc";

import { AddressForm } from "../AddressForm";
import { AddressGridSelector } from "../AddressGridSelector";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Address form used in checkout.
 */
const CheckoutAddress: React.FC<IProps> = ({
  checkoutAddress,
  email,
  selectedUserAddressId,
  userAddresses,
  countries,
  userId,
  formRef,
  formId,
  setShippingAddress,
  errors,
  newAddressFormId,
}: IProps) => {
  const citiesOptions = [
    "Ancón",
    "Ate Vitarte",
    "Barranco",
    "Breña",
    "Carabayllo",
    "Chaclacayo",
    "Chorrillos",
    "Cieneguilla",
    "Comas",
    "El Agustino",
    "Independencia",
    "Jesús María",
    "La Molina",
    "La Victoria",
    "Lima",
    "Lince",
    "Los Olivos",
    "Lurigancho",
    "Lurín",
    "Magdalena del Mar",
    "Miraflores",
    "Pachacamac",
    "Pucusana",
    "Pueblo Libre",
    "Puente Piedra",
    "Punta Hermosa",
    "Punta Negra",
    "Rímac",
    "San Bartolo",
    "San Borja",
    "San Isidro",
    "San Juan de Lurigancho",
    "San Juan de Miraflores",
    "San Luis",
    "San Martín de Porres",
    "San Miguel",
    "Santa Anita",
    "Santa María del Mar",
    "Santa Rosa",
    "Santiago de Surco",
    "Surquillo",
    "Villa El Salvador",
    "Villa María del Triunfo",
  ];

  return (
    <section>
      <S.Title data-cy="checkoutPageSubtitle"></S.Title>
      {userAddresses ? (
        <AddressGridSelector
          formId={formId}
          formRef={formRef}
          addresses={userAddresses}
          selectedAddressId={selectedUserAddressId}
          countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
          userId={userId}
          errors={errors}
          onSelect={(address, id) => setShippingAddress(address, undefined, id)}
          newAddressFormId={newAddressFormId}
        />
      ) : (
        <AddressForm
          formId={formId}
          formRef={formRef}
          citiesOptions={citiesOptions}
          countriesOptions={countries?.filter(filterNotEmptyArrayItems)}
          address={{
            ...checkoutAddress,
            email,
          }}
          onSelect={(address, email) => setShippingAddress(address, email)}
          handleSubmit={address => setShippingAddress(address, address?.email)}
          includeEmail={true}
          errors={errors}
        />
      )}
    </section>
  );
};

export { CheckoutAddress };
