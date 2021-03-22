import { Button, Loader } from "@app/components/atoms";
import { Link } from "react-router-dom";
import { NetworkStatus, OfflinePlaceholder } from "@temp/components";
import { Error } from "@temp/components/Error";
import classNames from "classnames";
import React from "react";
import { NothingFound, ProductItem } from "./";
import { TypedSearchResults } from "./queries";
import * as appPaths from "@temp/app/routes";

export const SearchNetworkResult = ({
  search,
  hasResults,
  hasSearchPhrase,
}) => {
  const linkToSearch = appPaths.searchUrl + "?q=" + search + "";
  return (
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
                variables={{ query: search }}
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
                          <Button>
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
