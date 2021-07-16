import { ProductTileAUNA } from "@components/molecules";
import { getProductsWithQuantity } from "@sdk/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { Skeleton } from "./skeleton";
import { Pagination } from "@farmacia-retail/farmauna-components";

export const ProductListAUNA: React.FC<IProps> = ({
  addToCart,
  columns = 4,
  loading = false,
  onPageChange,
  page,
  pageSize,
  products,
  productsOnCart,
  removeItemToCart,
  subtractItemToCart,
  total,
}: IProps) => {
  return (
    <>
      {
        loading ?
          <Skeleton columns={columns}/> :
          <>
          <S.List
            className="product-list-grid"
            columns={columns}
          >
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
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={onPageChange}
            />
          </>
      }
    </>
  );
};
