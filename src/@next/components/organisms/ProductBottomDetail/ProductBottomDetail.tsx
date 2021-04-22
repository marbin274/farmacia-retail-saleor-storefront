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
                  source={{
                    thumbnail: { url: product.thumbnail?.url! },
                    thumbnail2x: { url: product.thumbnail2x?.url! },
                  }}
                />
              </S.ProductImg>
              <S.ProductInfo>
                <S.ProductName>{product.name}</S.ProductName>
                <S.ProductPrice>{renderPrice()}</S.ProductPrice>
              </S.ProductInfo>
            </S.ProductContent>
          )}
          <S.CartContent>
            <ItemsHandler
              canAddToCart={canAddToCart}
              product={product}
              addToCart={addToCart}
              removeItemToCart={removeItemToCart}
              subtractItemToCart={subtractItemToCart}
            />
          </S.CartContent>
        </S.Content>
      </div>
    </S.Container>
  );
};
