import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { ICheckoutModelLine } from "@sdk/repository";
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
import { launchAddToCartEvent, launchRemoveToCartEvent } from "@sdk/gaConfig";

interface IProductList {
  products: ICheckoutModelLine[];
  onAdd(variantId: string, quantity: number): void;
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
      const { canAddToCart } = checkProductCanAddToCart(product, products);
      const isOnSale = checkProductIsOnSale(product);

      const productUrl = generateProductUrl(
        variant.product.id,
        variant.product.name
      );

      return (
        <li key={variant.product.id} className="cart__list__item">
          <Link to={productUrl}>
            <Thumbnail source={variant.product} />
          </Link>
          <div className="cart__list__item__details">
            <div className="cart__list__item__up">
              <Link to={productUrl}>
                <p className="cart__list__item__details--name">
                  {variant.product.name}
                </p>
              </Link>
              <button
                className="cart__list__item__details--button"
                onClick={() => {
                  removePaymentItems();
                  onRemove(variant.id);
                  launchRemoveToCartEvent(
                    variant?.sku,
                    variant?.product?.name,
                    variant?.pricing?.price?.gross,
                    quantity
                  );
                }}
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
                disableOnAdd={!canAddToCart}
                onAdd={() => {
                  removePaymentItems();
                  onAdd(variant.id, 1);
                  launchAddToCartEvent(
                    variant?.sku,
                    variant?.product?.name,
                    variant?.pricing?.price?.gross,
                    quantity,
                    "PEN"
                  )
                }}
                onRemove={() => {
                  removePaymentItems();
                  onSubtract(variant.id);
                  launchRemoveToCartEvent(
                    variant?.sku,
                    variant?.product?.name,
                    variant?.pricing?.price?.gross,
                    quantity
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
