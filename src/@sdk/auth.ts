import { ApolloClient, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse } from '@apollo/client/link/persisted-queries';
import { onError } from '@apollo/client/link/error';
import { LocalRepository } from '@temp/@sdk/repository';

const localRepository = new LocalRepository();

export function getAuthToken(): string | null {
  try {
    return localRepository.getToken();
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  localRepository.setToken(token);
  const authEvent = new Event('auth');
  dispatchEvent(authEvent);
}

export function removeAuthToken() {
  localRepository.setToken(null);
  const authEvent = new Event('auth');
  dispatchEvent(authEvent);
}

export function clearStorage(): void {
  localRepository.clearStorage();
  const authEvent = new Event('auth');
  dispatchEvent(authEvent);
}

export function fireSignOut(client?: ApolloClient<any>): void {
  clearStorage();
  if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
  if (client) {
    client.resetStore();
  }
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

// possibly remove callback here and use event emitter
export const invalidTokenLinkWithTokenHandler = (
  tokenExpirationCallback: () => void
): {
  link: ApolloLink;
} => {
  const link = onError((error: ResponseError) => {
    const isTokenExpired = error.graphQLErrors?.some(
      (error) => error.extensions?.exception?.code === 'JSONWebTokenExpired'
    );
    if (
      isTokenExpired ||
      (error.networkError && error.networkError.statusCode === 401)
    ) {
      tokenExpirationCallback();
    }
  });
  return { link };
};

export const authLink = setContext((_, context) => {
  const authToken = getAuthToken();
  return authToken
    ? {
        ...context,
        headers: {
          ...context.headers,
          Authorization: authToken ? `JWT ${authToken}` : null,
        },
      }
    : context;
});
