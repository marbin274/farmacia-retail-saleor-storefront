/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CardTokenInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserCardToken
// ====================================================

export interface CreateUserCardToken_accountCardTokenCreate_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CreateUserCardToken_accountCardTokenCreate_user_defaultShippingAddress_country {
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

export interface CreateUserCardToken_accountCardTokenCreate_user_defaultShippingAddress {
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
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateUserCardToken_accountCardTokenCreate_user_defaultShippingAddress_country;
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
}

export interface CreateUserCardToken_accountCardTokenCreate_user_defaultBillingAddress_country {
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

export interface CreateUserCardToken_accountCardTokenCreate_user_defaultBillingAddress {
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
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateUserCardToken_accountCardTokenCreate_user_defaultBillingAddress_country;
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
}

export interface CreateUserCardToken_accountCardTokenCreate_user_addresses_country {
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

export interface CreateUserCardToken_accountCardTokenCreate_user_addresses {
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
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CreateUserCardToken_accountCardTokenCreate_user_addresses_country;
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
}

export interface CreateUserCardToken_accountCardTokenCreate_user_cardTokens {
  __typename: "CardToken";
  /**
   * The ID of the object.
   */
  id: string;
  cardNumber: string;
  brand: string;
  binNumber: string;
  default: boolean;
  tokenId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserCardToken_accountCardTokenCreate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
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
  defaultShippingAddress: CreateUserCardToken_accountCardTokenCreate_user_defaultShippingAddress | null;
  defaultBillingAddress: CreateUserCardToken_accountCardTokenCreate_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (CreateUserCardToken_accountCardTokenCreate_user_addresses | null)[] | null;
  /**
   * List of all user's cards.
   */
  cardTokens: (CreateUserCardToken_accountCardTokenCreate_user_cardTokens | null)[] | null;
}

export interface CreateUserCardToken_accountCardTokenCreate {
  __typename: "AccountCardTokenCreate";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: CreateUserCardToken_accountCardTokenCreate_errors[];
  /**
   * A user instance for which the card was created.
   */
  user: CreateUserCardToken_accountCardTokenCreate_user | null;
}

export interface CreateUserCardToken {
  /**
   * Create a new card token.
   */
  accountCardTokenCreate: CreateUserCardToken_accountCardTokenCreate | null;
}

export interface CreateUserCardTokenVariables {
  input: CardTokenInput;
}
