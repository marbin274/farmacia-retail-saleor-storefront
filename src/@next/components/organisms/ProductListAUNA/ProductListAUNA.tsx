import { Loader } from "@components/atoms";
import { ProductTileAUNA } from "@components/molecules";
import { getProductsWithQuantity } from "@sdk/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { Button, PlusIcon } from "@farmacia-retail/farmauna-components";

export const ProductListAUNA: React.FC<IProps> = ({
  canLoadMore = false,
  loading = false,
  onLoadMore = () => null,
  products,
  productsOnCart,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
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
            subtractItemToCart={subtractItemToCart}
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
              variant="outline"
              data-cy="load-more_button"
              onClick={onLoadMore}
              type="button"
              icon={<PlusIcon size={12} />}
              >
                Cargar más
              </Button>
            )
          )}
      </S.Loader>
    </>
  );
};
