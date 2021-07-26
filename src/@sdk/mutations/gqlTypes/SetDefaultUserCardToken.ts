/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetDefaultUserCardToken
// ====================================================

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_errors {
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultShippingAddress_country {
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultShippingAddress {
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
  country: SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultShippingAddress_country;
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultBillingAddress_country {
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultBillingAddress {
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
  country: SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultBillingAddress_country;
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_addresses_country {
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_addresses {
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
  country: SetDefaultUserCardToken_accountSetDefaultCardToken_user_addresses_country;
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user_cardTokens {
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

export interface SetDefaultUserCardToken_accountSetDefaultCardToken_user {
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
  defaultShippingAddress: SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultShippingAddress | null;
  defaultBillingAddress: SetDefaultUserCardToken_accountSetDefaultCardToken_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (SetDefaultUserCardToken_accountSetDefaultCardToken_user_addresses | null)[] | null;
  /**
   * List of all user's cards.
   */
  cardTokens: (SetDefaultUserCardToken_accountSetDefaultCardToken_user_cardTokens | null)[] | null;
}

export interface SetDefaultUserCardToken_accountSetDefaultCardToken {
  __typename: "AccountSetDefaultCardToken";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: SetDefaultUserCardToken_accountSetDefaultCardToken_errors[];
  /**
   * An updated user instance.
   */
  user: SetDefaultUserCardToken_accountSetDefaultCardToken_user | null;
}

export interface SetDefaultUserCardToken {
  /**
   * Sets a default card for the authenticated user.
   */
  accountSetDefaultCardToken: SetDefaultUserCardToken_accountSetDefaultCardToken | null;
}

export interface SetDefaultUserCardTokenVariables {
  id: string;
}
