import {
  ApolloClient,
  ApolloError,
  ObservableQuery,
  WatchQueryOptions,
} from '@apollo/client';

import { GraphQLError } from 'graphql';

import { fireSignOut, getAuthToken, setAuthToken } from '../auth';
import { removeGaUserId, setGaUserId } from '../gaConfig';
import { MUTATIONS } from '../mutations';
import { PasswordChange } from '../mutations/gqlTypes/PasswordChange';
import { SaveFavoriteCategories } from '../mutations/gqlTypes/SaveFavoriteCategories';
import { AccountConfirm } from '../mutations/gqlTypes/AccountConfirm';
import { SetPassword } from '../mutations/gqlTypes/SetPassword';
import { TokenAuth_tokenCreate } from '../mutations/gqlTypes/TokenAuth';
import { QUERIES } from '../queries';
import { UserDetails } from '../queries/gqlTypes/UserDetails';
import { RequireAtLeastOne } from '../tsHelpers';
import {
  InferOptions,
  MapFn,
  QueryShape,
  WatchMapFn,
  WatchQueryData,
} from '../types';
import {
  getErrorsFromData,
  getMappedData,
  isDataEmpty,
  mergeEdges,
} from '../utils';
import {
  SaveFavoriteCategoriesResult,
  SetAccountConfirmResult,
  SetPasswordChange,
  SetPasswordResult,
  SignIn,
} from './types';
import { WINDOW_EXISTS } from '../consts';

export class APIProxy {
  getArticle = this.watchQuery(QUERIES.Article, (data) => data);

  getAttributes = this.watchQuery(
    QUERIES.Attributes,
    (data) => data.attributes
  );

  getProductDetails = this.watchQuery(
    QUERIES.ProductDetails,
    (data) => data.product
  );

  getCategoryDetails = this.watchQuery(QUERIES.CategoryDetails, (data) => data);

  getCategoryList = this.watchQuery(
    QUERIES.CategoryList,
    (data) => data.root_categories
  );

  getCategoryProducts = this.watchQuery(
    QUERIES.CategoryProducts,
    (data) => data.paginatedProducts
  );

  getCollectionProducts = this.watchQuery(
    QUERIES.CollectionProducts,
    (data) => data.paginatedProducts
  );

  getCollectionCategories = this.watchQuery(
    QUERIES.CollectionCategories,
    (data) => data
  );

  getFeaturedProducts = this.watchQuery(
    QUERIES.FeaturedProducts,
    (data) => data
  );
  getFeaturePlugins = this.watchQuery(
    QUERIES.GetShopFeaturePlugins,
    (data) => data.shop?.availableFeaturePlugins
  );

  getFooterSecondaryMenu = this.watchQuery(
    QUERIES.FooterSecondaryMenu,
    (data) => data
  );

  getHomePage = this.watchQuery(QUERIES.HomePage, (data) => data.shop);

  getLanding = this.watchQuery(QUERIES.Landing, (data) => data);

  getMainBanner = this.watchQuery(
    QUERIES.MainBanner,
    (data) => data.mainBanner
  );

  getMainMenu = this.watchQuery(QUERIES.MainMenu, (data) => data);
  getOrdersByUser = this.watchQuery(QUERIES.OrdersByUser, (data) =>
    data.me ? data.me.orders : null
  );

  getOrderDetails = this.watchQuery(
    QUERIES.OrderDetails,
    (data) => data.orderByToken
  );

  getPotentialSlots = this.watchQuery(
    QUERIES.GetPotencialSlots,
    (data) => data.potentialSlots
  );

  getProductList = this.watchQuery(
    QUERIES.ProductList,
    (data) => data.products
  );

  getVariantsProducts = this.watchQuery(
    QUERIES.VariantsProducts,
    (data) => data.productVariants
  );

  getPotentialShippingMethods = this.watchQuery(
    QUERIES.GetPotencialShippingMethods,
    (data) => data
  );

  getShopDetails = this.watchQuery(QUERIES.GetShopDetails, (data) => data);

  searchProducts = this.watchQuery(QUERIES.SearchProducts, (data) => data);

  searchResults = this.watchQuery(QUERIES.SearchResults, (data) => data);

  selledProducts = this.watchQuery(QUERIES.SelledProducts, (data) => data);

  setAccountUpdate = this.fireQuery(
    MUTATIONS.AccountUpdate,
    (data) => data!.accountUpdate
  );
  setCreateUserAddress = this.fireQuery(
    MUTATIONS.CreateUserAddress,
    (data) => data!.accountAddressCreate
  );

  setCreateUserCardToken = this.fireQuery(
    MUTATIONS.CreateUserCardToken,
    (data) => data!.accountCardTokenCreate
  );

  setDefaultUserCardToken = this.fireQuery(
    MUTATIONS.SetDefaultUserCardToken,
    (data) => data!.accountSetDefaultCardToken
  );
  setDeleteUserAddress = this.fireQuery(
    MUTATIONS.DeleteUserAddress,
    (data) => data!.accountAddressDelete
  );

  setDeleteUserCardToken = this.fireQuery(
    MUTATIONS.DeleteUserCardToken,
    (data) => data!.accountCardTokenDelete
  );

  setPasswordReset = this.fireQuery(MUTATIONS.PasswordReset, (data) => data);

  setRegisterAccount = this.fireQuery(
    MUTATIONS.RegisterAccount,
    (data) => data
  );

  setUpdateuserAddress = this.fireQuery(
    MUTATIONS.UpdateUserAddress,
    (data) => data!.accountAddressUpdate
  );
  setUserDefaultAddress = this.fireQuery(
    MUTATIONS.AddressTypeUpdate,
    (data) => data!.accountSetDefaultAddress
  );

  client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getUserDetails = (
    variables: InferOptions<QUERIES['UserDetails']>['variables'],
    options: Omit<InferOptions<QUERIES['UserDetails']>, 'variables'> & {
      onUpdate: (data: UserDetails['me'] | null) => void;
    }
  ) => {
    if (this.isLoggedIn()) {
      return this.watchQuery(QUERIES.UserDetails, (data) => {
        setGaUserId(data.me?.id);
        return data.me;
      })(variables, options);
    }
    if (options.onUpdate) {
      removeGaUserId();
      options.onUpdate(null);
    }
    return {
      refetch: () =>
        new Promise<{ data: UserDetails['me'] }>((resolve, _reject) => {
          resolve({ data: null });
        }),
      unsubscribe: () => undefined,
    };
  };

  signIn = async (
    variables: InferOptions<MUTATIONS['TokenAuth']>['variables'],
    options?: Omit<InferOptions<MUTATIONS['TokenAuth']>, 'variables'>
  ): Promise<SignIn> => {
    await this.client.resetStore();
    let result: {
      data: TokenAuth_tokenCreate | null;
    } | null = null;

    result = await this.fireQuery(
      MUTATIONS.TokenAuth,
      (mutationData) => mutationData!.tokenCreate
    )(variables, {
      ...options,
      fetchPolicy: 'no-cache',
    });
    const { data } = result;

    if (data?.token && data.errors.length === 0) {
      setAuthToken(data.token);
      if (window?.PasswordCredential && variables) {
        navigator.credentials.store(
          new window.PasswordCredential({
            id: variables.email,
            password: variables.password,
          })
        );
      }
    }
    return {
      data,
      error: null,
    };
  };

  signOut = () =>
    new Promise<void>(async (resolve, reject) => {
      try {
        fireSignOut(this.client);

        resolve();
      } catch (e) {
        reject(e);
      }
    });

  setPassword = async (
    variables: InferOptions<MUTATIONS['SetPassword']>['variables'],
    options?: Omit<InferOptions<MUTATIONS['SetPassword']>, 'variables'>
  ): Promise<SetPasswordResult> => {
    let result: {
      data: SetPassword | null;
    } | null = null;

    result = await this.fireQuery(MUTATIONS.SetPassword, (data) => data!)(
      variables,
      {
        ...options,
        fetchPolicy: 'no-cache',
      }
    );
    const { data } = result;

    return {
      data,
      error: null,
    };
  };

  saveFavoriteCategories = async (
    variables: InferOptions<MUTATIONS['SaveFavoriteCategories']>['variables'],
    options?: Omit<
      InferOptions<MUTATIONS['SaveFavoriteCategories']>,
      'variables'
    >
  ): Promise<SaveFavoriteCategoriesResult> => {
    let result: {
      data: SaveFavoriteCategories | null;
    } | null = null;

    result = await this.fireQuery(
      MUTATIONS.SaveFavoriteCategories,
      (data) => data!
    )(variables, {
      ...options,
      fetchPolicy: 'no-cache',
    });
    const { data } = result;

    return {
      data,
      error: null,
    };
  };

  setAccountConfirm = async (
    variables: InferOptions<MUTATIONS['SetAccountConfirm']>['variables'],
    options?: Omit<InferOptions<MUTATIONS['SetAccountConfirm']>, 'variables'>
  ): Promise<SetAccountConfirmResult> => {
    let result: {
      data: AccountConfirm | null;
    } | null = null;

    result = await this.fireQuery(MUTATIONS.SetAccountConfirm, (data) => data!)(
      variables,
      {
        ...options,
        fetchPolicy: 'no-cache',
      }
    );
    const { data } = result;

    return {
      data,
      error: null,
    };
  };

  setPasswordChange = async (
    variables: InferOptions<MUTATIONS['PasswordChange']>['variables'],
    options?: Omit<InferOptions<MUTATIONS['PasswordChange']>, 'variables'>
  ): Promise<SetPasswordChange> => {
    let result: {
      data: PasswordChange | null;
    } | null = null;

    result = await this.fireQuery(MUTATIONS.PasswordChange, (data) => data!)(
      variables,
      {
        ...options,
        fetchPolicy: 'no-cache',
      }
    );
    const { data } = result;

    return {
      data,
      error: null,
    };
  };

  attachAuthListener = (callback: (authenticated: boolean) => void) => {
    const eventHandler = () => {
      callback(this.isLoggedIn());
    };

    if (WINDOW_EXISTS) {
      window?.addEventListener('auth', eventHandler);
    }

    return () => {
      if (WINDOW_EXISTS) {
        window?.removeEventListener('auth', eventHandler);
      }
    };
  };

  isLoggedIn = () => {
    return !!getAuthToken();
  };

  watchQuery<T extends QueryShape, TResult>(
    query: T,
    mapFn: WatchMapFn<T, TResult>
  ) {
    return <
      TVariables extends InferOptions<T>['variables'],
      TOptions extends Omit<
        InferOptions<T> | WatchQueryOptions<InferOptions<T>>,
        'variables'
      >
    >(
      variables: TVariables,
      options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (
          data: ReturnType<typeof mapFn> | null,
          loading?: boolean
        ) => void;
      }
    ) => {
      const { onComplete, onError, onUpdate, ...apolloClientOptions } = options;

      const observable: ObservableQuery<WatchQueryData<T>, TVariables> = query(
        this.client,
        {
          ...apolloClientOptions,
          variables,
        }
      );

      if (options.skip) {
        return {
          refetch: () => {
            return new Promise((resolve) => {
              resolve({ data: null });
            });
          },
          unsubscribe: null,
        };
      }

      const subscription = observable.subscribe(
        (result) => {
          const { data, errors: apolloErrors, loading } = result;
          const errorHandledData = handleDataErrors(
            mapFn,
            data as any,
            apolloErrors
          );
          if (onUpdate) {
            if (errorHandledData.errors) {
              if (onError) {
                onError(errorHandledData.errors);
              }
            } else {
              onUpdate(errorHandledData.data as TResult, loading);
              if (onComplete) {
                onComplete();
              }
            }
          }
        },
        (error) => {
          if (onError) {
            onError(error);
          }
        }
      );

      return {
        loadMore: (
          extraVariables: RequireAtLeastOne<TVariables>,
          mergeResults: boolean = true
        ) => {
          observable.fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                // returning previousResult doesn't trigger observable `next`
                onUpdate(mapFn(previousResult));
                return previousResult;
              }

              if (mergeResults) {
                const prevResultRef = mapFn(previousResult) as any;
                const newResultRef = mapFn(fetchMoreResult) as any;

                if (!prevResultRef || !newResultRef) {
                  onUpdate(prevResultRef);
                  return previousResult;
                }

                const mergedEdges = mergeEdges(
                  prevResultRef.edges,
                  newResultRef.edges
                );

                // use new result for metadata and mutate existing data
                Object.keys(prevResultRef).forEach((key) => {
                  prevResultRef[key] = newResultRef[key];
                });
                prevResultRef.edges = mergedEdges;

                return previousResult;
              }

              return fetchMoreResult;
            },
            variables: { ...variables, ...extraVariables },
          });
        },
        refetch: (newVariables?: TVariables) => {
          if (newVariables) {
            observable.setVariables(newVariables);
            const cachedResult = observable.getCurrentResult();
            const errorHandledData = handleDataErrors(
              mapFn,
              cachedResult.data as {}
            );
            if (errorHandledData.data) {
              onUpdate(errorHandledData.data as TResult);
            }
          }

          return this.firePromise(
            () => observable.refetch(newVariables),
            mapFn
          );
        },
        setOptions: (newOptions: TOptions) =>
          this.firePromise(() => observable.setOptions(newOptions), mapFn),
        unsubscribe: subscription.unsubscribe.bind(subscription),
      };
    };
  }

  fireQuery<T extends QueryShape, TResult>(query: T, mapFn: MapFn<T, TResult>) {
    return (
      variables: InferOptions<T>['variables'],
      options?: Omit<InferOptions<T>, 'variables'>
    ) =>
      this.firePromise(
        () =>
          query(this.client, {
            ...options,
            variables,
          }),
        mapFn
      );
  }

  // Promise wrapper to catch errors
  firePromise<T extends QueryShape, TResult>(
    promise: () => Promise<any>,
    mapFn: MapFn<T, TResult> | WatchMapFn<T, TResult>
  ) {
    return new Promise<{ data: ReturnType<typeof mapFn> | null }>(
      async (resolve, reject) => {
        try {
          const { data, errors: apolloErrors } = await promise();
          const errorHandledData = handleDataErrors(mapFn, data, apolloErrors);

          if (errorHandledData.errors) {
            reject(errorHandledData.errors);
          }

          resolve({ data: errorHandledData.data });
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}

// error handler
const handleDataErrors = <T extends QueryShape, TData>(
  mapFn: MapFn<T, TData> | WatchMapFn<T, TData>,
  data: TData,
  apolloErrors?: readonly GraphQLError[]
) => {
  // INFO: user input errors will be moved to graphql errors
  const userInputErrors = getErrorsFromData(data);
  const errors =
    apolloErrors || userInputErrors
      ? new ApolloError({
          extraInfo: userInputErrors,
          graphQLErrors: apolloErrors,
        })
      : null;

  if (errors && isDataEmpty(data)) {
    return { errors };
  }

  const result = getMappedData(mapFn, data);

  return { data: result };
};
