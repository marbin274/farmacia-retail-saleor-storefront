import { launchAddToCartEvent, launchRemoveToCartEvent } from "@sdk/gaConfig";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import { checkStockLimitOrStockAvailable, ICheckStockLimitOrStockAvailable } from "@temp/@next/utils/products";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../../atoms";
import { itemNotificationsService } from "../../atoms/ItemsNotification";
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubstractItemToCartCallback
} from "../../molecules/ProductTileAUNA/types";
import "./scss/index.scss";
type IProps = {
  canAddToCart?: boolean;
  disableOnAdd?: boolean;
  disableOnRemove?: boolean;
  product: ISimpleProduct;
  maxValue?: number;
  addToCart: IAddToCartCallback | undefined;
  removeItemToCart?: IRemoveItemToCartCallback;
  substractItemToCart?: ISubstractItemToCartCallback;
};

const ItemsHandler: FC<IProps> = ({
  canAddToCart,
  disableOnAdd = false,
  maxValue = MAX_ORDER_PER_PRODUCT,
  product,
  addToCart,
  removeItemToCart,
  substractItemToCart,
}) => {
  const [
    isValueLessThanMaxOrderPerProduct,
    setIsValueLessThanMaxOrderPerProduct,
  ] = useState(false);
  const quantity: number = product?.quantity || 0;
  const [isValueLessThanMax, setIsValueLessThanMax] = useState(false);
  const { isLimitMax, stockLimitMax } = React.useMemo((): ICheckStockLimitOrStockAvailable | { isLimitMax: boolean, stockLimitMax: number } => (
    product ?
      checkStockLimitOrStockAvailable(product) :
      { isLimitMax: false, stockLimitMax: 0 }
  ), [product]);

  useEffect(() => {
    setIsValueLessThanMaxOrderPerProduct(quantity < MAX_ORDER_PER_PRODUCT);
    setIsValueLessThanMax(quantity < maxValue);
  }, [quantity, maxValue, MAX_ORDER_PER_PRODUCT]);

  const isEnabledToAddProduct =
    !disableOnAdd && isValueLessThanMaxOrderPerProduct && isValueLessThanMax;

  const handleAddClick = () => {
    if (isEnabledToAddProduct) {
      if (canAddToCart) {
        const firstProductVariant = product?.variants?.[0] || product?.variant;
        const total: number = product?.quantity as number;
        
        if (firstProductVariant) {  
          removePaymentItems();
          addToCart?.({
            id: firstProductVariant.id,
            product: { 
              id: product?.id, 
              name: product?.name,
              pricing: firstProductVariant?.pricing,
              quantityAvailable: firstProductVariant?.quantityAvailable,
            },
          }, 1);
          itemNotificationsService.sendNotifications(product, 1);
        }

        launchAddToCartEvent(
          firstProductVariant?.sku as string,
          product?.name,
          firstProductVariant?.pricing?.price?.gross?.amount,
          total + 1,
          "PEN"
        );
      }
    }
  };

  const handleRemoveClick = () => {
    const firstProductVariant = product?.variants?.[0] || product?.variant;
    const total: number = product?.quantity as number;
    if (firstProductVariant) {
      removePaymentItems();
      if (product.quantity && product.quantity < 2) {
        removeItemToCart?.(firstProductVariant.id);
      } else {
        substractItemToCart?.(firstProductVariant.id);
      }
    }

    launchRemoveToCartEvent(
      firstProductVariant?.sku as string,
      product?.name,
      firstProductVariant?.pricing?.price?.gross?.amount,
      total - 1
    );
  };

  return (
    <>
      {addToCart && product.quantity ? (
        <div className="itemHandler">
          <div className="itemHandler--actions">
            <Button
              className={classNames("item-action", "add_remove_button")}
              onClick={handleRemoveClick}
              type="button"
            >
              -
          </Button>
            <p>{quantity}</p>
            <Button
              disabled={!canAddToCart}
              className={classNames("item-action", "add_remove_button")}
              onClick={handleAddClick}
              type="button"
            >
              +
          </Button>
          </div>
          {(!canAddToCart && isLimitMax) && <div><span className="itemHandler__limit-max">Max. {stockLimitMax} por promoción</span></div>}
        </div>
      ) : (
        <div className="button">
          <Button 
          onClick={handleAddClick} 
          disabled={!canAddToCart}
          type="button"
          >
            Agregar
          </Button>
        </div>
      )}
    </>
  );
};

export default ItemsHandler;
