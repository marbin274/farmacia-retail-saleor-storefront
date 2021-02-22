import { Button, Loader } from "@components/atoms";
import { ProductTileAUNA } from "@components/molecules";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductListAUNA: React.FC<IProps> = ({
  canLoadMore = false,
  loading = false,
  onLoadMore = () => null,
  products,
  productsOnCart,
  addToCart,
  removeItemToCart,
  substractItemToCart,
}: IProps) => {

  return (
    <>
      <S.List>
        {getProductsWithQuantity(
          products,
          productsOnCart
        ).map(product => (
          <ProductTileAUNA
            key={product.id}
            addToCart={addToCart}
            removeItemToCart={removeItemToCart}
            substractItemToCart={substractItemToCart}
            product={product}
            productsOnCart={productsOnCart}
            productUrl={generateProductUrl(product.id, product.name)}
          />
        ))}
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
                Cargar +
              </Button>
            )
          )}
      </S.Loader>
    </>
  );
};
