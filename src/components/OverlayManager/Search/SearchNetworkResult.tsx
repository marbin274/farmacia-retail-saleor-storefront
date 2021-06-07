import { Button, Loader } from "@app/components/atoms";
import { Link } from "react-router-dom";
import { NetworkStatus, OfflinePlaceholder } from "@temp/components";
import { Error } from "@temp/components/Error";
import classNames from "classnames";
import React from "react";
import { NothingFound, ProductItem } from "./";
import { TypedSearchResults } from "./queries";
import * as appPaths from "@temp/app/routes";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { maybe } from "@temp/core/utils";
import { SearchResults } from "./gqlTypes/SearchResults";
import { SEARCH_PRODUCTS_QUERY_MIN_LENGTH } from "@temp/core/config";
import { searchProductsService } from "@temp/@next/services/searchProductsService";

export const SearchNetworkResult = () => {
  const [search, setSearch] = React.useState<string>('');
  const linkToSearch = appPaths.searchUrl + "?q=" + search + "";
  const [districtSelected] = useDistrictSelected();

  const hasSearchPhrase = search.length >= SEARCH_PRODUCTS_QUERY_MIN_LENGTH;

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  document.body.style.overflow = hasSearchPhrase ? "hidden" : "";

  React.useEffect(() => {
    const suscription = searchProductsService
      .on()
      .subscribe((payload: string) => setSearch(payload || ''));
    return suscription.unsubscribe;
  }, []);

  return (

    !hasSearchPhrase ? <></> :
      <div
        className={classNames("search__products", "search__products--expanded", {
          "search__products--background-opacity": !hasSearchPhrase,
        })}
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
                    districtId: districtSelected.code,
                  }}
                >
                  {({ data, error, loading }) => {
                    if (hasResults(data)) {
                      return (
                        <>
                          <div className="search__products__results">
                            {loading ? (
                              <Loader />
                            ) : (
                              <p>
                                {data.products.edges.length} resultados para{" "}
                                <span>"{search}"</span>
                              </p>
                            )}
                          </div>
                          <ul className="search__products__list">
                            {data.products.edges.map(product => (
                              <ProductItem {...product} key={product.node.id} />
                            ))}
                          </ul>
                          <div className="show_more_products">
                            <Button onClick={()=>{
                              setSearch('');
                            }}>
                              <Link to={linkToSearch}>
                                Ver todos los resultados
                            </Link>
                            </Button>
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
