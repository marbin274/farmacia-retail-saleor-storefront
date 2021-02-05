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
}: IProps) => {

  const productsWithQuantity = getProductsWithQuantity(products, productsOnCart);

  return (
    <>
      {productsWithQuantity.map((product) =>
        <ProductTileAUNA
          key={product.id}
          addToCart={addToCart}
          product={product}
          productsOnCart={productsOnCart}
          productUrl={generateProductUrl(product.id, product.name)}
        />)}

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
