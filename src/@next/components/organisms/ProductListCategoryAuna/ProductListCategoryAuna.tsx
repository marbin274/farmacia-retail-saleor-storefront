import { ProductTileAUNA } from "@components/molecules";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { Skeleton } from "./skeleton";

export const ProductListCategoryAuna: React.FC<IProps> = ({
  loading = false,
  products,
  productsOnCart,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
}: IProps) => {
  return (
    <>
      {
        loading ?
          <Skeleton /> :
          <S.List className="product-list-grid">
            {getProductsWithQuantity(
              products,
              productsOnCart
            ).map(product => (
              <ProductTileAUNA
                key={product.id}
                addToCart={addToCart}
                removeItemToCart={removeItemToCart}
                subtractItemToCart={subtractItemToCart}
                product={product}
                productsOnCart={productsOnCart}
                productUrl={generateProductUrl(product.id, product.name)}
              />
            ))}
          </S.List>
      }
    </>
  );
};
