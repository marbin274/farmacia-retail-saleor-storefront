/* tslint:disable */

import React from "react";
import { Button, Loader } from "@components/atoms";
import { ProductTileAUNA } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";
import { generateProductUrl } from "@temp/core/utils";

export const ProductListAUNA: React.FC<IProps> = ({
  addToCart,
  canLoadMore = false,
  loading = false,
  onLoadMore = () => null,
  products,
  items,
}: IProps) => {
  return (
    <>
      <S.List>
        {products.map(product => (
          <ProductTileAUNA
            key={product.id}
            addToCart={addToCart}
            product={product}
            linkProduct={generateProductUrl(product.id, product.name)}
            items={items}
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
              More +
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
