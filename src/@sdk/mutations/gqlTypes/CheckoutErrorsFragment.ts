/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: CheckoutErrorsFragment
// ====================================================

export interface CheckoutErrorsFragment_products {
  __typename: "FailedProduct";
  /**
   * Product variant SKU which causes error.
   */
  sku: string | null;
  /**
   * Stock available 
   */
  quantityAvailable: number | null;
}

export interface CheckoutErrorsFragment {
  __typename: "CheckoutError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: CheckoutErrorCode;
  /**
   * List of products that produce errors.
   */
  products: (CheckoutErrorsFragment_products | null)[] | null;
}
