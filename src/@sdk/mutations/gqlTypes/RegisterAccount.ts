/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterAccount
// ====================================================

export interface RegisterAccount_accountRegister_accountErrors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface RegisterAccount_accountRegister {
  __typename: "AccountRegister";
  accountErrors: RegisterAccount_accountRegister_accountErrors[];
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
}

export interface RegisterAccount {
  /**
   * Register a new user.
   */
  accountRegister: RegisterAccount_accountRegister | null;
}

export interface RegisterAccountVariables {
  email: string;
  password: string;
  redirectUrl: string;
  firstName?: string | null;
  lastName?: string | null;
  termsAndConditions?: boolean | null;
  dataTreatmentPolicy?: boolean | null;
  documentNumber?: string | null;
}
