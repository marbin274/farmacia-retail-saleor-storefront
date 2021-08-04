/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountConfirm
// ====================================================

export interface AccountConfirm_confirmAccount_accountErrors {
  __typename: "AccountError";
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
  code: AccountErrorCode;
}

export interface AccountConfirm_confirmAccount {
  __typename: "ConfirmAccount";
  accountErrors: AccountConfirm_confirmAccount_accountErrors[];
}

export interface AccountConfirm {
  /**
   * Confirm user account with token sent by email during registration.
   */
  confirmAccount: AccountConfirm_confirmAccount | null;
}

export interface AccountConfirmVariables {
  email: string;
  token: string;
}
