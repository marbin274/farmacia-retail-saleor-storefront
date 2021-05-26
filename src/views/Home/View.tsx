import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useCart } from "@temp/@sdk/react";
import { searchUrl } from "@temp/app/routes";
import { MetaWrapper } from "@temp/components";
import { SearchForm } from "@temp/components/OverlayManager/Search/SearchForm";
import { SearchNetworkResult } from "@temp/components/OverlayManager/Search/SearchNetworkResult";
import * as React from "react";
import { useHistory } from "react-router";

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
  const history = useHistory();

  const handleSubmit = (searchQs: string) => {
    history.push(`${searchUrl}?${searchQs}`);
  };

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

          const subtractItemToCart: ISubtractItemToCartCallback = product => {
            subtractItem(product);
          };

          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              <SearchForm
                addressGeocalizationMode="ligth"
                autofocus={false}
                handleSubmit={handleSubmit}
                >
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
                  subtractItemToCart={subtractItemToCart}
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
