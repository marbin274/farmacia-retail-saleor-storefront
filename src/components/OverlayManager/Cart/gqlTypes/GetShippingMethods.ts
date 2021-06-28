/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutLineInput } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetShippingMethods
// ====================================================

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
  /**
   * Flag to recognize if this shipping method has schedules to select.
   */
  isScheduled: boolean | null;
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
