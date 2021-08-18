import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { ErrorResponse, onError } from 'apollo-link-error';
import { LocalRepository } from '@temp/@sdk/repository';

export const authEvent = new Event('auth');
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
  dispatchEvent(authEvent);
}

export function removeAuthToken() {
  localRepository.setToken(null);
  dispatchEvent(authEvent);
}

export function clearStorage(): void {
  localRepository.clearStorage();
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
