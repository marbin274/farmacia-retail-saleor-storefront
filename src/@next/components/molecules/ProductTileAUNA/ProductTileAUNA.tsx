import { Button, ProductSticker } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  getProductPricingClass,
} from "@temp/@next/utils/products";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { IProps } from "./types";
import ItemsHandler from "../../organisms/ItemsHandler/ItemsHandler";
import { itemNotificationsService } from "../../atoms/ItemsNotification";

export const ProductTileAUNA: React.FC<IProps> = ({
  addToCart,
  removeItemToCart,
  substractItemToCart,
  productUrl: productLink,
  product,
  productsOnCart,
}: IProps) => {
  const [thumbnails, setThumbnails] = useState<{
    thumbnail: { url: string | undefined };
    thumbnail2x: { url: string | undefined };
  }>({
    thumbnail: { url: "" },
    thumbnail2x: { url: "" },
  });

  const canAddToCart = checkProductCanAddToCart(product, productsOnCart);
  const isOnSale = checkProductIsOnSale(product);

  const onAddToCart = () => {
    if (canAddToCart) {
      const firstProductVariant = product?.variants?.[0];

      if (firstProductVariant) {
        removePaymentItems();
        addToCart?.(firstProductVariant.id, 1);
        if (product.quantity) {
          itemNotificationsService.sendNotifications(
            product,
            product.quantity + 1
          );
        } else {
          itemNotificationsService.sendNotifications(product, 1);
        }
      }
    }
  };

  const onSubstractToCart = () => {
    const firstProductVariant = product?.variants?.[0];
    if (firstProductVariant) {
      removePaymentItems();
      if (product.quantity && product.quantity < 2) {
        removeItemToCart?.(firstProductVariant.id);
      } else {
        substractItemToCart?.(firstProductVariant.id);
      }
    }
  };

  useEffect(() => {
    setThumbnails({
      thumbnail: { url: product?.thumbnail?.url || "" },
      thumbnail2x: { url: product?.thumbnail2x?.url || "" },
    });
  }, [product.thumbnail, product.thumbnail2x]);

  return (
    <S.ProductCard data-cy="product-tile" canAddToCart={canAddToCart}>
      <Link to={productLink} key={product.id}>
        <S.WrapperStockout>
          <ProductSticker canAddToCart={canAddToCart} isOnSale={isOnSale} />
          <div className="img">
            <S.Image>
              <Thumbnail source={thumbnails} />
            </S.Image>
          </div>
          <div className="description">
            <S.Title>{product.name}</S.Title>
          </div>
          <div className={getProductPricingClass(canAddToCart, isOnSale)}>
            <S.Price>
              <TaxedMoney taxedMoney={product?.pricing?.priceRange?.start} />
            </S.Price>
          </div>
          {isOnSale && (
            <div className="price undiscounted_price">
              <TaxedMoney
                taxedMoney={product?.pricing?.priceRangeUndiscounted?.start}
              />
            </div>
          )}
        </S.WrapperStockout>
      </Link>
      {addToCart &&
        (product.quantity ? (
          <ItemsHandler
            onAdd={onAddToCart}
            onRemove={onSubstractToCart}
            value={product.quantity}
            availables={product?.variants?.[0].quantityAvailable}
          />
        ) : (
          <div className="button">
            <Button onClick={onAddToCart} disabled={!canAddToCart}>
              Agregar
            </Button>
          </div>
        ))}
    </S.ProductCard>
  );
};
