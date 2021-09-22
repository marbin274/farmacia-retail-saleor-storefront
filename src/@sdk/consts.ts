export const WINDOW_EXISTS = typeof window !== 'undefined';

export const LOCAL_STORAGE_EXISTS = WINDOW_EXISTS && !!window.localStorage;
export const NAVIGATOR_EXISTS = WINDOW_EXISTS && !!window.navigator;
export const CREDENTIAL_API_EXISTS =
  WINDOW_EXISTS && !!window.PasswordCredential;
