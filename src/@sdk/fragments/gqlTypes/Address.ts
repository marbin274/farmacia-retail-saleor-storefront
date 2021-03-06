/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Address
// ====================================================

export interface Address_district {
  __typename: "District";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Address_country {
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

export interface Address {
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
  district: Address_district | null;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: Address_country;
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
