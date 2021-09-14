import { Button, CartIcon } from '@farmacia-retail/farmauna-components';
import { launchAddToCartEvent, launchRemoveToCartEvent } from '@sdk/gaConfig';
import { ISimpleProduct } from '@sdk/types/IProduct';
import { removePaymentItems } from '@temp/@next/utils/checkoutValidations';
import {
  checkStockLimitOrStockAvailable,
  ICheckStockLimitOrStockAvailable,
} from '@sdk/utils/products';
import { MAX_ORDER_PER_PRODUCT } from '@sdk/config';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { itemNotificationsService } from '../../atoms/ItemsNotification';
import {
  IAddToCartCallback,
  IRemoveItemToCartCallback,
  ISubtractItemToCartCallback,
} from '../../molecules/ProductTileAUNA/types';
import * as S from './styles';

type IProps = {
  canAddToCart?: boolean;
  disableOnAdd?: boolean;
  disableOnRemove?: boolean;
  product: ISimpleProduct;
  maxValue?: number;
  addToCart: IAddToCartCallback | undefined;
  removeItemToCart?: IRemoveItemToCartCallback;
  subtractItemToCart?: ISubtractItemToCartCallback;
  isPersonalizeProduct: boolean;
};

const ItemsHandler: FC<IProps> = ({
  canAddToCart,
  disableOnAdd = false,
  maxValue = MAX_ORDER_PER_PRODUCT,
  product,
  addToCart,
  removeItemToCart,
  subtractItemToCart,
  isPersonalizeProduct,
}) => {
  const [
    isValueLessThanMaxOrderPerProduct,
    setIsValueLessThanMaxOrderPerProduct,
  ] = useState(false);
  const quantity: number = product?.quantity || 0;
  const [isValueLessThanMax, setIsValueLessThanMax] = useState(false);
  const { isLimitMax, stockLimitMax } = React.useMemo(
    ():
      | ICheckStockLimitOrStockAvailable
      | { isLimitMax: boolean; stockLimitMax: number } =>
      product
        ? checkStockLimitOrStockAvailable(product)
        : { isLimitMax: false, stockLimitMax: 0 },
    [product]
  );

  useEffect(() => {
    setIsValueLessThanMaxOrderPerProduct(quantity < MAX_ORDER_PER_PRODUCT);
    setIsValueLessThanMax(quantity < maxValue);
  }, [quantity, maxValue, MAX_ORDER_PER_PRODUCT]);

  const isEnabledToAddProduct =
    !disableOnAdd && isValueLessThanMaxOrderPerProduct && isValueLessThanMax;

  const handleAddClick = () => {
    if (isEnabledToAddProduct) {
      if (canAddToCart) {
        const firstProductVariant = product?.variant;
        const total: number = product?.quantity as number;

        if (firstProductVariant) {
          removePaymentItems();
          addToCart?.(
            {
              id: firstProductVariant.id,
              product: {
                id: product?.id,
                name: product?.name,
                pricing: firstProductVariant?.pricing,
                quantityAvailable: firstProductVariant?.quantityAvailable,
                category: product?.category,
              },
            },
            1
          );
          itemNotificationsService.sendNotifications(product, 1);
        }

        launchAddToCartEvent(
          firstProductVariant?.sku as string,
          product?.name,
          firstProductVariant?.pricing?.price?.gross?.amount,
          total + 1,
          'PEN',
          isPersonalizeProduct
        );
      }
    }
  };

  const handleRemoveClick = () => {
    const firstProductVariant = product?.variant;
    const total: number = product?.quantity as number;
    if (firstProductVariant) {
      removePaymentItems();
      if (product.quantity && product.quantity < 2) {
        removeItemToCart?.(firstProductVariant.id);
      } else {
        subtractItemToCart?.(firstProductVariant.id);
      }
    }

    launchRemoveToCartEvent(
      firstProductVariant?.sku as string,
      product?.name,
      firstProductVariant?.pricing?.price?.gross?.amount,
      total - 1
    );
  };

  // quitar cuando ya no se use el A/B testing
  const handleButtonAddClick = () => {
    handleAddClick();
  };

  return (
    <>
      {addToCart && product.quantity ? (
        <div className="itemHandler fa-flex fa-flex-col fa-items-center">
          <div className="itemHandler--actions fa-items-center fa-content-center fa-bg-primary-lightest fa-rounded-4xl fa-flex fa-flex-nowrap fa-flex-row fa-justify-between fa-w-32 fa-h-12">
            <S.AddRemoveButton
              className={classNames('item-action')}
              onClick={handleRemoveClick}
              type="button"
            >
              -
            </S.AddRemoveButton>
            <p className="fa-flex fa-items-center fa-p-0 fa-text-base fa-font-medium fa-text-gray-02">
              {quantity}
            </p>
            <S.AddRemoveButton
              disabled={!canAddToCart}
              className={classNames('item-action')}
              onClick={handleAddClick}
              type="button"
            >
              +
            </S.AddRemoveButton>
          </div>
          {!canAddToCart && isLimitMax && (
            <div className="fa-text-center">
              <span className="fa-text-warning-medium fa-text-xs">
                Max. {stockLimitMax} por promoción
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="button">
          <Button
            onClick={handleButtonAddClick}
            disabled={!canAddToCart}
            type="button"
            icon={<CartIcon />}
          >
            Agregar
          </Button>
        </div>
      )}
    </>
  );
};

export default ItemsHandler;
