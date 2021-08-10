import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { useCart } from "@temp/@sdk/react";
import { MetaWrapper } from "@temp/components";
import * as React from "react";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

const View: React.FC = () => {
  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();

  return (
    <div className="fa-bg-neutral-lightest fa-z-o">
      <TypedHomePageQuery alwaysRender errorPolicy="all" loaderFull>
        {({ data }) => {
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
              <div className="fa-bg-neutral-light">
                <Page
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
