import { ApolloError } from "apollo-client";
import { CreateCheckout_checkoutCreate_checkoutErrors } from "../mutations/gqlTypes/CreateCheckout";
import { PasswordChange } from "../mutations/gqlTypes/PasswordChange";
import { SetPassword } from "../mutations/gqlTypes/SetPassword";
import { TokenAuth_tokenCreate } from "../mutations/gqlTypes/TokenAuth";

export interface ErrorResponse<T> {
  error?: any;
  type?: T;
}

export interface FunctionQueueResponse {
  pending: boolean;
}
export interface FunctionRunResponse<D, F> {
  data?: any;
  dataError?: ErrorResponse<D>;
  functionError?: ErrorResponse<F>;
  checkoutErrors?: CreateCheckout_checkoutCreate_checkoutErrors[];
  pending: boolean;
}

export type PromiseQueuedResponse = Promise<FunctionQueueResponse>;
export type PromiseRunResponse<D, F> = Promise<FunctionRunResponse<D, F>>;

export type SignIn = {
  data: TokenAuth_tokenCreate | null;
  error: ApolloError | null;
} | null;

export type SetPasswordChange = {
  data: PasswordChange | null;
  error: ApolloError | null;
} | null;

export type SetPasswordResult = {
  data: SetPassword | null;
  error: ApolloError | null;
} | null;
