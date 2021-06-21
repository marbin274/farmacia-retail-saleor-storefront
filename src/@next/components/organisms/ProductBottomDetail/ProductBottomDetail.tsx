import React, { FC } from "react";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
import * as S from "./styles";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from "@components/molecules/ProductTileAUNA/types";
import { Thumbnail } from "@components/molecules";

type IProps = {
  product: ISimpleProduct;
  canAddToCart: boolean;
  renderPrice: () => JSX.Element;
  addToCart: IAddToCartCallback;
  removeItemToCart?: IRemoveItemToCartCallback;
  subtractItemToCart?: ISubtractItemToCartCallback;
  hideProductDetails?: boolean;
};

export const ProductBottomDetail: FC<IProps> = ({
  product,
  renderPrice,
  canAddToCart,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
  hideProductDetails,
}) => {
  return (
    <S.Container>
      <div className="container">
        <S.Content>
          {!hideProductDetails && (
            <S.ProductContent>
              <S.ProductImg>
                <Thumbnail
                  height={510}
                  source={{
                    thumbnail: { url: product.thumbnail?.url! },
                    thumbnail2x: { url: product.thumbnail2x?.url! },
                  }}
                  width={510} 
                  />
              </S.ProductImg>
              <S.ProductInfo>
                <S.ProductName>{product.name}</S.ProductName>
                <div className="inline-element">
                    <S.ProductPrice>
                      {renderPrice()}
                    </S.ProductPrice>
                    <ItemsHandler
                    canAddToCart={canAddToCart}
                    product={product}
                    addToCart={addToCart}
                    removeItemToCart={removeItemToCart}
                    subtractItemToCart={subtractItemToCart}
                  />
                </div>
              </S.ProductInfo>
            </S.ProductContent>
          )}
        </S.Content>
      </div>
    </S.Container>
  );
};