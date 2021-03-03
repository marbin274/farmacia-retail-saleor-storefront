import { Loader } from "@app/components/atoms";
import { NetworkStatus, OfflinePlaceholder } from "@temp/components";
import { Error } from "@temp/components/Error";
import classNames from "classnames";
import React from "react";
import { NothingFound, ProductItem } from "./";
import { TypedSearchResults } from "./queries";

export const SearchNetworkResult = ({ search, hasResults, hasSearchPhrase }) => {
    return <div
        className={classNames(
            "search__products",
            "search__products--expanded",
            {
                "search__products--background-opacity": !hasSearchPhrase,
            }
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
                                            <ul className="search__products__list" >
                                                {data.products.edges.map(product => (
                                                    <ProductItem
                                                        {...product}
                                                        key={product.node.id}
                                                    />
                                                ))}
                                            </ul>
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
}