/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserAddress
// ====================================================

export interface CreateUserAddress_accountAddressCreate_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  district: CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateUserAddress_accountAddressCreate_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
  latitude: number | null;
  longitude: number | null;
  alias: string | null;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultBillingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateUserAddress_accountAddressCreate_user_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  district: CreateUserAddress_accountAddressCreate_user_defaultBillingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateUserAddress_accountAddressCreate_user_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
  latitude: number | null;
  longitude: number | null;
  alias: string | null;
}

export interface CreateUserAddress_accountAddressCreate_user_addresses_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateUserAddress_accountAddressCreate_user_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface CreateUserAddress_accountAddressCreate_user_addresses {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  district: CreateUserAddress_accountAddressCreate_user_addresses_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateUserAddress_accountAddressCreate_user_addresses_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
  latitude: number | null;
  longitude: number | null;
  alias: string | null;
}

export interface CreateUserAddress_accountAddressCreate_user_cardTokens {
  __typename: "CardToken";
  binNumber: string;
  brand: string;
  cardNumber: string;
  default: boolean;
  email: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
}

export interface CreateUserAddress_accountAddressCreate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  /**
   * List of favorite categories ID.
   */
  favoriteCategories: (string | null)[] | null;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  /**
   * Terms and Conditions
   */
  termsAndConditions: boolean | null;
  /**
   * Data Treatment Policy
   */
  dataTreatmentPolicy: boolean | null;
  documentNumber: string | null;
  defaultShippingAddress: CreateUserAddress_accountAddressCreate_user_defaultShippingAddress | null;
  defaultBillingAddress: CreateUserAddress_accountAddressCreate_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (CreateUserAddress_accountAddressCreate_user_addresses | null)[] | null;
  /**
   * List of all user's cards.
   */
  cardTokens: (CreateUserAddress_accountAddressCreate_user_cardTokens | null)[] | null;
}

export interface CreateUserAddress_accountAddressCreate {
  __typename: "AccountAddressCreate";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: CreateUserAddress_accountAddressCreate_errors[];
  /**
   * A user instance for which the address was created.
   */
  user: CreateUserAddress_accountAddressCreate_user | null;
}

export interface CreateUserAddress {
  /**
   * Create a new address for the customer.
   */
  accountAddressCreate: CreateUserAddress_accountAddressCreate | null;
}

export interface CreateUserAddressVariables {
  input: AddressInput;
}
