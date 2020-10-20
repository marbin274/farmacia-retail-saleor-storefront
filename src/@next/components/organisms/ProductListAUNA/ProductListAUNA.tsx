/* tslint:disable */

import React from "react";
import { Link } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { ProductTileAUNA } from "@components/molecules";

import { generateProductUrl } from "@temp/core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListAUNA: React.FC<IProps> = ({
  addToCart,
  canLoadMore = false,
  loading = false,
  onLoadMore = () => null,
  products,
}: IProps) => {

  return (
    <>
      <S.List>
        {products.map(product => (
          <Link
            to={generateProductUrl(product.id, product.name)}
            key={product.id}
          >
            <ProductTileAUNA addToCart={addToCart} product={product} />
          </Link>
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
