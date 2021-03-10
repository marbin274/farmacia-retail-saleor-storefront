import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { ICheckoutModelLine, ICheckoutModelLineVariantLocalStorage } from "@sdk/repository";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  getProductPricingClass,
} from "@temp/@next/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import * as React from "react";
import { Link } from "react-router-dom";
import ItemQuantity from "./ItemQuantity";
import { addToCartEvent, removeToCartEvent } from "@sdk/utils";

declare global {
  interface Window {
    dataLayer: any;
  }
}

interface IProductList {
  products: ICheckoutModelLine[];
  onAdd(variant: ICheckoutModelLineVariantLocalStorage, quantity: number): void;
  onRemove(variantId: string): void;
  onSubtract(variantId: string): void;
}

const ProductList: React.FC<IProductList> = ({
  products,
  onAdd,
  onRemove,
  onSubtract,
}) => (
  <ul className="cart__list">
    {products.map(product => {
      const { variant, quantity } = product;
      const {canAddToCart} = checkProductCanAddToCart(product, products);
      const isOnSale = checkProductIsOnSale(product);
      const id: string | undefined = product.id ? product.id : variant.product?.id;
      const name: string | undefined = product.name ? product.name : variant.product?.name;
      const productUrl: string | undefined = (id && name) ? generateProductUrl(id, name) : undefined;

      if (!productUrl) {
        return null;
      }

      return (
        <li key={id} className="cart__list__item">
          <Link to={productUrl}>
            {variant.product && <Thumbnail source={variant.product} />}
          </Link>
          <div className="cart__list__item__details">
            <div className="cart__list__item__up">
              <Link to={productUrl}>
                <p className="cart__list__item__details--name">
                  {name}
                </p>
              </Link>
              <button
                className="cart__list__item__details--button"
                onClick={() => {
                  removePaymentItems();
                  onRemove(variant.id);
                  window?.dataLayer?.push(
                    removeToCartEvent(
                      variant?.sku,
                      variant?.product?.name,
                      variant?.pricing?.price?.gross,
                      quantity
                    )
                  );
                }
              }
              >
                Eliminar
              </button>
            </div>
            <div className="cart__list__item__down">
              <TaxedMoney
                className={`cart__list__item__quantity__price price ${getProductPricingClass(
                  canAddToCart,
                  isOnSale
                )}`}
                taxedMoney={variant.pricing.price}
              />
              <ItemQuantity
                onAdd={() => {
                  removePaymentItems();
                  onAdd({ id: variant.id, product: { id, name } }, 1);
                  window?.dataLayer?.push(
                    addToCartEvent(
                      variant?.sku,
                      variant?.product?.name,
                      variant?.pricing?.price?.gross,
                      quantity,
                      "PEN"
                    )
                  );
                }}
                onRemove={() => {
                  removePaymentItems();
                  onSubtract(variant.id);
                  window?.dataLayer?.push(
                    removeToCartEvent(
                      variant?.sku,
                      variant?.product?.name,
                      variant?.pricing?.price?.gross,
                      quantity
                    )
                  );
                }}
                value={quantity}
                maxValue={variant.quantityAvailable}
              />
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
