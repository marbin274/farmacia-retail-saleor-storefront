import { Loader } from "@app/components/atoms";
import { Link, useLocation } from "react-router-dom";
import { NetworkStatus, OfflinePlaceholder } from "@temp/components";
import { Error } from "@temp/components/Error";
import classNames from "classnames";
import React from "react";
import { NothingFound, ProductItem } from "./";
import { TypedSearchResults } from "./queries";
import * as appPaths from "@temp/app/routes";
import { Button } from "@farmacia-retail/farmauna-components";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { maybe } from "@temp/core/utils";
import { SearchResults } from "./gqlTypes/SearchResults";
import { SEARCH_PRODUCTS_QUERY_MIN_LENGTH } from "@temp/core/config";
import { searchProductsService } from "@temp/@next/services/searchProductsService";

export const SearchNetworkResult = () => {
  const [search, setSearch] = React.useState<string>("");
  const linkToSearch = appPaths.searchUrl + "?q=" + search + "";
  const [districtSelected] = useDistrictSelected();
  const location = useLocation();

  const isInProductDetail = location.pathname.includes("product");

  const hasSearchPhrase = search.length >= SEARCH_PRODUCTS_QUERY_MIN_LENGTH;

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  document.body.style.overflow = hasSearchPhrase ? "hidden" : "";

  React.useEffect(() => {
    const suscription = searchProductsService
      .on()
      .subscribe((payload: string) => setSearch(payload || ""));
    return suscription.unsubscribe;
  }, []);

  return !hasSearchPhrase ? (
    <></>
  ) : (
    <div
      className={classNames(
        "search__products",
        "search__products--expanded",
        {
          "search__products--background-opacity": !hasSearchPhrase,
        },
        { "search__products--in-front": isInProductDetail }
      )}
    >
      <NetworkStatus>
        {isOnline => {
          if (hasSearchPhrase) {
            return (
              <TypedSearchResults
                renderOnError
                displayError={false}
                errorPolicy="all"
                variables={{
                  query: search,
                  districtId: districtSelected.id,
                }}
              >
                {({ data, error, loading }) => {
                  if (hasResults(data)) {
                    return (
                      <>
                        <div className="fa-border-b fa-border-solid fa-border-neutral-medium lg:fa-border-0 search__products__header">
                          {loading ? (
                            <Loader />
                          ) : (
                            <>
                              <span className='fa-text-neutral-darkest fa-font-semibold fa-text-2xl fa-mb-6 lg:fa-block fa-hidden'>Resultado de búsqueda</span>
                              <span className='fa-text-sm fa-flex'>
                                <span className='fa-text-neutral-darkest fa-font-semibold fa-mr-1'>{data.products.edges.length}</span>
                                <h4 className='fa-text-sm'>
                                  {" "}resultados de <span className='fa-text-neutral-darkest fa-font-semibold'>"{search}"</span>
                                </h4>
                              </span>
                            </>
                          )}
                        </div>
                        <div className="search__products__body">
                          <div className="search__products__list">
                            <ul>
                              {data.products.edges.map(product => (
                                <ProductItem
                                  {...product}
                                  key={product.node.id}
                                />
                              ))}
                            </ul>
                          </div>
                          <div className="show_more_products">
                            <Link to={linkToSearch}>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  searchProductsService.hide();
                                }}
                              >
                                Ver todos los resultados
                              </Button>
                            </Link>
                          </div>
                        </div>
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

                  if (error) {
                    return isOnline ? (
                      <Error error={error.message} />
                    ) : (
                      <OfflinePlaceholder />
                    );
                  }

                  return <NothingFound search={search} />;
                }}
              </TypedSearchResults>
            );
          }
          return null;
        }}
      </NetworkStatus>
    </div>
  );
};
