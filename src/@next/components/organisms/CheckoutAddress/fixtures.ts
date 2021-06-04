import { IAddressWithAddressType } from "@types";

import {
  GetShop_shop_availableDistricts,
  GetShop_shop_countries,
} from "@temp/@sdk/queries/gqlTypes/GetShop";
import { Address } from "./types";

interface ICheckoutAddressData extends IAddressWithAddressType {
  email?: string;
}

const formAddress: ICheckoutAddressData = {
  city: "San Isidro",
  companyName: "Mirumee",
  country: {
    code: "PL",
    country: "Poland",
  },
  countryArea: "dolnyslask",
  email: "abc@xyz.com",
  firstName: "John",
  id: "12345",
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: true,
  lastName: "Doe",
  latitude: -12.046373,
  longitude: -77.042755,
  phone: "+51958451245",
  postalCode: "55-555",
  streetAddress1: "St Street",
  streetAddress2: "Second",
};

const userAddress: Address = {
  address: {
    city: "San Isidro",
    companyName: "Mirumee",
    country: {
      code: "PL",
      country: "Poland",
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  id: "12345",
};

export const mockCity = { code: "San Isidro", description: "San Isidro" };

const countries: GetShop_shop_countries[] = [
  { __typename: "CountryDisplay", code: "PL", country: "Poland" },
  { __typename: "CountryDisplay", code: "PT", country: "Portugal" },
  {
    __typename: "CountryDisplay",
    code: "US",
    country: "United States of America",
  },
  { __typename: "CountryDisplay", code: "DE", country: "Germany" },
  { __typename: "CountryDisplay", code: "BE", country: "Belarus" },
  { __typename: "CountryDisplay", code: "SE", country: "Sweden" },
  { __typename: "CountryDisplay", code: "FR", country: "France" },
  { __typename: "CountryDisplay", code: "CZ", country: "Czech Republic" },
  { __typename: "CountryDisplay", code: "FI", country: "Finland" },
  { __typename: "CountryDisplay", code: "GB", country: "Great Britain" },
];

const availableDistricts: GetShop_shop_availableDistricts[] = [
  {
    id: "1",
    isActive: true,
    isDefault: false,
    name: "Miraflores",
    __typename: "District",
  },
  {
    id: "2",
    isActive: true,
    isDefault: false,
    name: "San Isidro",
    __typename: "District",
  },
];

export const LOGGED_IN_USER_PROPS = {
  availableDistricts,
  countries,
  userAddresses: [
    {
      ...userAddress,
    },
  ],
};

export const ANONYMOUS_USER_PROPS = {
  availableDistricts,
  checkoutAddress: formAddress,
  countries,
  email: formAddress.email,
};
