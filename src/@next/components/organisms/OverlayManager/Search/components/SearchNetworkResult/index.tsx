import { Loader, NetworkStatus, OfflinePlaceholder } from '@components/atoms';
import { Error } from '@components/atoms/Error';
import { Button } from '@farmacia-retail/farmauna-components';
import { SearchResults } from '@sdk/queries/gqlTypes/SearchResults';
import { useSearchResults } from '@sdk/react';
import { useDistrictSelected } from '@temp/@next/hooks/useDistrictSelected';
import { searchProductsService } from '@temp/@next/services/searchProductsService';
import * as appPaths from '@temp/app/routes';
import { SEARCH_PRODUCTS_QUERY_MIN_LENGTH } from '@temp/core/config';
import { maybe } from '@temp/core/utils';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { NothingFound, ProductItem } from '../..';
import * as S from './styles';

export const SearchNetworkResult = () => {
  const [search, setSearch] = React.useState<string>('');
  const linkToSearch = appPaths.searchUrl + '?q=' + search + '';
  const [districtSelected] = useDistrictSelected();
  const { data, loading, error } = useSearchResults(
    {
      query: search,
      districtId: districtSelected.id,
    },
    { errorPolicy: 'all' }
  );

  const hasSearchPhrase = search.length >= SEARCH_PRODUCTS_QUERY_MIN_LENGTH;

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  document.body.style.overflow = hasSearchPhrase ? 'hidden' : '';

  React.useEffect(() => {
    const suscription = searchProductsService
      .on()
      .subscribe((payload: string) => setSearch(payload || ''));
    return suscription.unsubscribe;
  }, []);

  if (!hasSearchPhrase) {
    return <></>;
  }

  const renderSearchResults = (isOnline: boolean) => {
    if (hasResults(data)) {
      return (
        <>
          <S.SearchProductsHeader className="fa-border-b fa-border-solid fa-border-neutral-medium fa-p-4 fa-text-left fa-font-normal fa-text-blackDark lg:fa-border-0">
            {loading ? (
              <Loader />
            ) : (
              <>
                <span className="fa-text-neutral-darkest fa-font-semibold fa-text-2xl fa-mb-6 lg:fa-block fa-hidden">
                  Resultado de búsqueda
                </span>
                <span className="fa-text-sm fa-flex">
                  <span className="fa-text-neutral-darkest fa-font-semibold fa-mr-1">
                    {data.products.edges.length}
                  </span>
                  <h4 className="fa-text-sm">
                    {' '}
                    resultados de{' '}
                    <span className="fa-text-neutral-darkest fa-font-semibold">
                      "{search}"
                    </span>
                  </h4>
                </span>
              </>
            )}
          </S.SearchProductsHeader>
          <S.SearchProductsBody className="fa-bg-white lg:fa-bg-gray-20">
            <S.SearchProductList className="fa-overflow-auto">
              <ul className="fa-my-0 fa-mx-auto lg:fa-mb-20">
                {data.products.edges.map((product) => (
                  <ProductItem {...product} key={product.node.id} />
                ))}
              </ul>
            </S.SearchProductList>
            <S.ShowMoreProducts className="fa-flex fa-items-center fa-bg-white fa-h-18 fa-justify-center fa-text-center fa-w-full fa-sticky fa-bottom-0">
              <Link to={linkToSearch}>
                <Button
                  onClick={() => searchProductsService.hide()}
                  variant="outline"
                >
                  Ver todos los resultados
                </Button>
              </Link>
            </S.ShowMoreProducts>
          </S.SearchProductsBody>
        </>
      );
    }
    if (error) {
      return isOnline ? (
        <Error error={error.message} />
      ) : (
        <OfflinePlaceholder />
      );
    }

    return <NothingFound search={search} />;
  };

  return (
    <S.SearchProductsWrapper
      hasSearchPhrase={hasSearchPhrase}
      className={classNames(
        'fa-p-0 fa-fixed fa-right-0 fa-transition fa-duration-300 fa-w-screen fa-z-5 lg:fa-z-3',
        {
          'fa-bg-white lg:fa-bg-gray-20': hasSearchPhrase,
        }
      )}
    >
      <NetworkStatus>
        {(isOnline) => {
          if (hasSearchPhrase) {
            return renderSearchResults(isOnline);
          }
          return null;
        }}
      </NetworkStatus>
    </S.SearchProductsWrapper>
  );
};
