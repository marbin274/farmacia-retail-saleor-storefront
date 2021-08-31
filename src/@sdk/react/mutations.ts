import { mutationFactory } from './useMutation';

export const useSignIn = mutationFactory('signIn');
export const useSignOut = mutationFactory('signOut');

// Address mutations
export const useDefaultUserAddress = mutationFactory('setUserDefaultAddress');
export const useDeleteUserAddresss = mutationFactory('setDeleteUserAddress');
export const useCreateUserAddress = mutationFactory('setCreateUserAddress');
export const useUpdateUserAddress = mutationFactory('setUpdateuserAddress');

// User mutations
export const usePasswordChange = mutationFactory('setPasswordChange');
export const useAccountConfirm = mutationFactory('setAccountConfirm');
export const useAccountUpdate = mutationFactory('setAccountUpdate');
export const useSetPassword = mutationFactory('setPassword');
export const usePasswordReset = mutationFactory('setPasswordReset');
export const useRegisterAccount = mutationFactory('setRegisterAccount');
export const useSaveFavoriteCategories = mutationFactory(
  'saveFavoriteCategories'
);

export const useSetDefaultUserCardToken = mutationFactory(
  'setDefaultUserCardToken'
);
export const useCreateUserCardToken = mutationFactory('setCreateUserCardToken');
export const useDeleteUserCardToken = mutationFactory('setDeleteUserCardToken');
