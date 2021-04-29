import { ISimpleProduct } from "@app/types/IProduct";
import { Carousel } from "@temp/@next/components/containers";
import { ProductTileAUNA } from "@temp/@next/components/molecules";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@temp/@next/components/molecules/ProductTileAUNA/types";
import { getProductsWithQuantity } from "@temp/@next/utils/products";
import { useCart } from "@temp/@sdk/react";
import { generateProductUrl } from "@temp/core/utils";
import React, { FC, useCallback } from "react";
import * as S from "./styles";

export type IProductsCollectionProps = {
  name: string;
  products: ISimpleProduct[];
};

const ProductsCollection: FC<IProductsCollectionProps> = ({ name, products }) => {
  const {
    items: productsOnCart,
    addItem,
    removeItem,
    subtractItem,
  } = useCart();

  const addToCart = useCallback<IAddToCartCallback>((product, quantity) => {
    addItem(product, quantity);
  }, []);

  const removeItemToCart = useCallback<IRemoveItemToCartCallback>(product => {
    removeItem(product);
  }, []);

  const subtractItemToCart = useCallback<ISubtractItemToCartCallback>(
    product => {
      subtractItem(product);
    },
    []
  );

  return (
    <S.Container>
      <S.Content>
        <S.Title>{name}</S.Title>
        <Carousel>
          {getProductsWithQuantity(products, productsOnCart).map(product => (
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
        </Carousel>
      </S.Content>
    </S.Container>
  );
};

export default ProductsCollection;
