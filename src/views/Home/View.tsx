import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubstractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useCart } from "@temp/@sdk/react";
import { MetaWrapper } from "@temp/components";
import { SearchForm } from "@temp/components/OverlayManager/Search/SearchForm";
import { SearchNetworkResult } from "@temp/components/OverlayManager/Search/SearchNetworkResult";
import * as React from "react";

import Page from "./Page";
import { TypedHomePageQuery } from "./queries";
import "./scss/index.scss";

const View: React.FC = () => {
  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();
  return (
    <div className="home-page">
      <TypedHomePageQuery alwaysRender errorPolicy="all" loaderFull>
        {({ data, loading }) => {
          const addToCart: IAddToCartCallback = (product, quantity) => {
            addItem(product, quantity);
          };

          const removeItemToCart: IRemoveItemToCartCallback = product => {
            removeItem(product);
          };

          const substractItemToCart: ISubstractItemToCartCallback = product => {
            subtractItem(product);
          };

          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              <SearchForm>
                {(search, hasSearchPhrase, hasResults) => {
                  if (hasSearchPhrase) {
                    document.body.style.overflow = "hidden";
                    return (
                      <SearchNetworkResult
                        search={search}
                        hasResults={hasResults}
                        hasSearchPhrase={hasSearchPhrase}
                      />
                    );
                  } else {
                    document.body.style.overflow = "";
                    return <></>;
                  }
                }}
              </SearchForm>
              <div className="home-view">
                <Page
                  loading={loading}
                  productsOnCart={productsOnCart}
                  shop={data.shop}
                  addToCart={addToCart}
                  removeItemToCart={removeItemToCart}
                  substractItemToCart={substractItemToCart}
                />
              </div>
            </MetaWrapper>
          );
        }}
      </TypedHomePageQuery>
    </div>
  );
};

export default View;
