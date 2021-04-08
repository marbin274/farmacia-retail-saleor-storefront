import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { launchRemoveToCartEvent } from "@sdk/gaConfig";
import { ICheckoutModelLine, ICheckoutModelLineVariantLocalStorage } from "@sdk/repository";
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
import { removePaymentItems } from "@temp/@next/utils/checkoutValidations";
import {
  checkProductCanAddToCart,
  checkProductIsOnSale,
  getProductPricingClass
} from "@temp/@next/utils/products";
import { generateProductUrl } from "@temp/core/utils";
import * as React from "react";
import { Link } from "react-router-dom";

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
      const { canAddToCart } = checkProductCanAddToCart(product, products);
      const isOnSale = checkProductIsOnSale(product);
      const id: string | undefined = variant.product?.id;
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
              <ItemsHandler
                canAddToCart={canAddToCart}
                product={product}
                addToCart={onAdd}
                removeItemToCart={onRemove}
                substractItemToCart={onSubtract}
              />
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
