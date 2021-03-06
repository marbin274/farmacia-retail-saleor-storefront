import { Loader } from '@temp/@next/components/atoms';
import { LocalRepository } from '@temp/@sdk/repository';
import {
  ApolloQueryResult,
  ErrorPolicy,
  FetchPolicy,
  QueryResult,
  QueryFunctionOptions,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import * as React from 'react';
import { Query } from '@apollo/client/react/components';
import { Error } from '@components/atoms/Error';
import { RequireAtLeastOne } from './tsUtils';
import { maybe } from './utils';
interface LoadMore<TData, TVariables> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    extraVariables: RequireAtLeastOne<TVariables>
  ) => Promise<ApolloQueryResult<TData>>;
}

interface TypedQueryInnerProps<TData, TVariables> {
  children: (
    result: QueryResult<TData, TVariables> & LoadMore<TData, TVariables>
  ) => JSX.Element;
  displayError?: boolean;
  displayLoader?: boolean;
  fetchPolicy?: FetchPolicy;
  loader?: React.ReactElement;
  loaderFull?: boolean;
  renderOnError?: boolean;
  skip?: boolean;
  variables?: TVariables;
  errorPolicy?: ErrorPolicy;
  alwaysRender?: boolean;
  alwaysLoader?: boolean;
  onCompleted?: (data: TData) => void;
}

export function TypedQuery<TData, TVariables>(query: DocumentNode) {
  const localRepository = new LocalRepository();
  return (props: TypedQueryInnerProps<TData, TVariables>) => {
    const {
      children,
      displayError = true,
      displayLoader = true,
      renderOnError = false,
      alwaysRender = false,
      alwaysLoader = false,
      fetchPolicy = 'cache-and-network',
      errorPolicy,
      loader,
      loaderFull,
      skip,
      variables,
      onCompleted,
    } = props as JSX.LibraryManagedAttributes<
      QueryFunctionOptions<TData, TVariables>,
      TypedQueryInnerProps<TData, TVariables>
    >;
    return (
      <Query
        query={query}
        variables={variables}
        skip={skip}
        fetchPolicy={fetchPolicy}
        errorPolicy={errorPolicy}
        onCompleted={onCompleted}
      >
        {(
          queryData: QueryResult<TData, TVariables> &
            LoadMore<TData, TVariables>
        ) => {
          const { error, loading, data, fetchMore } = queryData;
          const hasData = maybe(() => !!Object.keys(data).length, false);
          const loadMore = (
            mergeFunc: (
              previousResults: TData,
              fetchMoreResult: TData
            ) => TData,
            extraVariables: RequireAtLeastOne<TVariables>
          ) =>
            fetchMore({
              query,
              updateQuery: (previousResults, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResults;
                }
                return mergeFunc(previousResults, fetchMoreResult);
              },
              variables: { ...variables, ...extraVariables },
            });

          if (displayError && error && !hasData) {
            return <Error error={error.message} />;
          }
          const districtChanged = localRepository.getDistrictChanged();
          if (
            displayLoader &&
            loading &&
            loader &&
            districtChanged === 'true'
          ) {
            localRepository.setDistrictChanged('false');
            return <>{loader}</>;
          } else if (displayLoader && loading && !!alwaysLoader) {
            return loader ? <>{loader}</> : <Loader fullScreen={loaderFull} />;
          } else if (displayLoader && loading && !hasData) {
            return loader ? <>{loader}</> : <Loader fullScreen={loaderFull} />;
          }

          if (hasData || (renderOnError && error) || alwaysRender) {
            return children({ ...queryData, loadMore });
          }

          return null;
        }}
      </Query>
    );
  };
}
