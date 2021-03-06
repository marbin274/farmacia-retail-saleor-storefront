/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetails
// ====================================================

export interface UserDetails_me_defaultShippingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UserDetails_me_defaultShippingAddress_country {
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

export interface UserDetails_me_defaultShippingAddress {
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
  district: UserDetails_me_defaultShippingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UserDetails_me_defaultShippingAddress_country;
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

export interface UserDetails_me_defaultBillingAddress_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UserDetails_me_defaultBillingAddress_country {
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

export interface UserDetails_me_defaultBillingAddress {
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
  district: UserDetails_me_defaultBillingAddress_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UserDetails_me_defaultBillingAddress_country;
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

export interface UserDetails_me_addresses_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UserDetails_me_addresses_country {
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

export interface UserDetails_me_addresses {
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
  district: UserDetails_me_addresses_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UserDetails_me_addresses_country;
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

export interface UserDetails_me_cardTokens {
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

export interface UserDetails_me {
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
  defaultShippingAddress: UserDetails_me_defaultShippingAddress | null;
  defaultBillingAddress: UserDetails_me_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (UserDetails_me_addresses | null)[] | null;
  /**
   * List of all user's cards.
   */
  cardTokens: (UserDetails_me_cardTokens | null)[] | null;
}

export interface UserDetails {
  /**
   * Return the currently authenticated user.
   */
  me: UserDetails_me | null;
}
