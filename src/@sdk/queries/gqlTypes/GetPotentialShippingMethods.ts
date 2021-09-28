/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineInput, ShippingMethodTypeCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetPotentialShippingMethods
// ====================================================

export interface GetPotentialShippingMethods_potentialShippingMethods_maximumOrderPrice {
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

export interface GetPotentialShippingMethods_potentialShippingMethods_methodType {
  __typename: "ShippingMethodType";
  /**
   * The ID of the object.
   */
  id: string;
  code: ShippingMethodTypeCode;
  name: string;
}

export interface GetPotentialShippingMethods_potentialShippingMethods_minimumOrderPrice {
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

export interface GetPotentialShippingMethods_potentialShippingMethods_price {
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

export interface GetPotentialShippingMethods_potentialShippingMethods_scheduleDates_scheduleTimes {
  __typename: "ScheduleTime";
  /**
   * The ID of the object.
   */
  id: string;
  startTime: any;
  endTime: any;
}

export interface GetPotentialShippingMethods_potentialShippingMethods_scheduleDates {
  __typename: "ScheduleByDate";
  /**
   * Date.
   */
  date: any | null;
  /**
   * Available schedules for a date.
   */
  scheduleTimes: (GetPotentialShippingMethods_potentialShippingMethods_scheduleDates_scheduleTimes | null)[] | null;
}

export interface GetPotentialShippingMethods_potentialShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  maximumOrderPrice: GetPotentialShippingMethods_potentialShippingMethods_maximumOrderPrice | null;
  methodType: GetPotentialShippingMethods_potentialShippingMethods_methodType | null;
  minimumOrderPrice: GetPotentialShippingMethods_potentialShippingMethods_minimumOrderPrice | null;
  name: string;
  price: GetPotentialShippingMethods_potentialShippingMethods_price | null;
  /**
   * List of filtered schedules a customer can pick.
   */
  scheduleDates: (GetPotentialShippingMethods_potentialShippingMethods_scheduleDates | null)[] | null;
  subtitle: string | null;
}

export interface GetPotentialShippingMethods {
  /**
   * Potential Shipping methods that can be used with these conditions.
   */
  potentialShippingMethods: (GetPotentialShippingMethods_potentialShippingMethods | null)[] | null;
}

export interface GetPotentialShippingMethodsVariables {
  lines: (CheckoutLineInput | null)[];
  district?: string | null;
}
