/* tslint:disable */
import React from "react";
import { Button, Loader } from "@components/atoms";
import { ProductTileAUNA } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";
import { generateProductUrl } from "@temp/core/utils";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";

export const ProductListAUNA: React.FC<IProps> = ({
  addToCart,
  canLoadMore = false,
  loading = false,
  onLoadMore = () => null,
  products,
  productsOnCart,
}: IProps) => {
  const productsWithQuantity = products.map(product => {
    const productOnCart = productsOnCart?.find(({ variant }) =>
      product.variants ? variant.id === product.variants[0].id : false
    );
    product.quantity = productOnCart ? productOnCart.quantity : 0;

    if (!product.variants) {
      product.variants = [];
    }

    product.variants[0].quantityAvailable = productOnCart
      ? productOnCart.variant.quantityAvailable
      : MAX_ORDER_PER_PRODUCT;

    return {
      ...product,
    };
  });

  console.log("products", products);
  console.log("productsOnCart", productsOnCart);

  return (
    <>
      <S.List>
        {productsWithQuantity.map(product => {
          return (
            <ProductTileAUNA
              key={product.id}
              addToCart={addToCart}
              product={product}
              linkProduct={generateProductUrl(product.id, product.name)}
            />
          );
        })}
      </S.List>
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button
              data-cy="load-more_button"
              color="secondary"
              onClick={onLoadMore}
            >
              More +
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
