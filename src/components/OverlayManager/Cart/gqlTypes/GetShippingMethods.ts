/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../../@sdk/gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetShippingMethods
// ====================================================

export interface GetShippingMethods_potentialShippingMethods_maximumOrderPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface GetShippingMethods_potentialShippingMethods_methodType {
  __typename: "ShippingMethodType";
  code: string;
}

export interface GetShippingMethods_potentialShippingMethods_minimumOrderPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface GetShippingMethods_potentialShippingMethods_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Culture Code.
   */
  culture: string;
  /**
   * Currency code.
   */
  currency: string;
}

export interface GetShippingMethods_potentialShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  maximumOrderPrice: GetShippingMethods_potentialShippingMethods_maximumOrderPrice | null;
  methodType: GetShippingMethods_potentialShippingMethods_methodType | null;
  minimumOrderPrice: GetShippingMethods_potentialShippingMethods_minimumOrderPrice | null;
  name: string;
  price: GetShippingMethods_potentialShippingMethods_price | null;
}

export interface GetShippingMethods {
  /**
   * Potential Shipping methods that can be used with these conditions.
   */
  potentialShippingMethods: (GetShippingMethods_potentialShippingMethods | null)[];
}

export interface GetShippingMethodsVariables {
  lines: (CheckoutLineInput | null)[];
}
