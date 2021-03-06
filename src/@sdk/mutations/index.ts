import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions,
} from '@apollo/client';

import * as Address from './address';
import * as Auth from './auth';
import * as CardToken from './cardToken';
import {
  AccountConfirm,
  AccountConfirmVariables,
} from './gqlTypes/AccountConfirm';
import {
  AccountUpdate,
  AccountUpdateVariables,
} from './gqlTypes/AccountUpdate';
import {
  CreateUserAddress,
  CreateUserAddressVariables,
} from './gqlTypes/CreateUserAddress';
import {
  CreateUserCardToken,
  CreateUserCardTokenVariables,
} from './gqlTypes/CreateUserCardToken';
import {
  DeleteUserAddress,
  DeleteUserAddressVariables,
} from './gqlTypes/DeleteUserAddress';
import {
  DeleteUserCardToken,
  DeleteUserCardTokenVariables,
} from './gqlTypes/DeleteUserCardToken';
import {
  PasswordChange,
  PasswordChangeVariables,
} from './gqlTypes/PasswordChange';
import {
  RegisterAccount,
  RegisterAccountVariables,
} from './gqlTypes/RegisterAccount';
import {
  ResetPassword,
  ResetPasswordVariables,
} from './gqlTypes/ResetPassword';
import {
  SaveFavoriteCategories,
  SaveFavoriteCategoriesVariables,
} from './gqlTypes/SaveFavoriteCategories';
import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables,
} from './gqlTypes/SetCustomerDefaultAddress';
import {
  SetDefaultUserCardToken,
  SetDefaultUserCardTokenVariables,
} from './gqlTypes/SetDefaultUserCardToken';
import { SetPassword, SetPasswordVariables } from './gqlTypes/SetPassword';
import { TokenAuth, TokenAuthVariables } from './gqlTypes/TokenAuth';
import {
  UpdateUserAddress,
  UpdateUserAddressVariables,
} from './gqlTypes/UpdateUserAddress';
import * as User from './user';

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  'mutation'
>;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  AccountUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<AccountUpdate, AccountUpdateVariables>
  ) =>
    client.mutate({
      mutation: User.accountUpdate,
      ...options,
    }),
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetCustomerDefaultAddress,
      SetCustomerDefaultAddressVariables
    >
  ) =>
    client.mutate({
      mutation: Address.setCustomerDefaultAddress,
      ...options,
    }),
  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserAddress, CreateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.createUserAddress,
      ...options,
    }),
  CreateUserCardToken: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserCardToken, CreateUserCardTokenVariables>
  ) =>
    client.mutate({
      mutation: CardToken.createUserCardToken,
      ...options,
    }),
  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserAddress, DeleteUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.deleteUserAddress,
      ...options,
    }),
  DeleteUserCardToken: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserCardToken, DeleteUserCardTokenVariables>
  ) =>
    client.mutate({
      mutation: CardToken.deleteUserCardToken,
      ...options,
    }),

  PasswordReset: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<ResetPassword, ResetPasswordVariables>
  ) =>
    client.mutate({
      mutation: User.passwordResetMutation,
      ...options,
    }),

  PasswordChange: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<PasswordChange, PasswordChangeVariables>
  ) =>
    client.mutate({
      mutation: User.changeUserPassword,
      ...options,
    }),
  RegisterAccount: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<RegisterAccount, RegisterAccountVariables>
  ) =>
    client.mutate({
      mutation: User.accountRegisterMutation,
      ...options,
    }),
  SetPassword: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<SetPassword, SetPasswordVariables>
  ) =>
    client.mutate({
      mutation: User.setPassword,
      ...options,
    }),
  SaveFavoriteCategories: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SaveFavoriteCategories,
      SaveFavoriteCategoriesVariables
    >
  ) =>
    client.mutate({
      mutation: User.saveFavoriteCategories,
      ...options,
    }),
  SetAccountConfirm: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<AccountConfirm, AccountConfirmVariables>
  ) =>
    client.mutate({
      mutation: User.setAccountConfirm,
      ...options,
    }),
  SetDefaultUserCardToken: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetDefaultUserCardToken,
      SetDefaultUserCardTokenVariables
    >
  ) =>
    client.mutate({
      mutation: CardToken.setDefaultUserCardToken,
      ...options,
    }),
  TokenAuth: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<TokenAuth, TokenAuthVariables>
  ) =>
    client.mutate({
      mutation: Auth.tokenAuthMutation,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateUserAddress, UpdateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.updateUserAddress,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
