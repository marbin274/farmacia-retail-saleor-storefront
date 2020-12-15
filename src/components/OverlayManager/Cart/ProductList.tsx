import * as React from "react";
import { ICheckoutModelLine } from "@sdk/repository";
import { Link } from "react-router-dom";
import { generateProductUrl } from "@temp/core/utils";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import ItemQuantity from "./ItemQuantity";

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
    {products.map(({ variant, quantity }) => {
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
                onClick={() => onRemove(variant.id)}
              >
                Eliminar
              </button>
            </div>
            <div className="cart__list__item__down">
              <TaxedMoney
                className="cart__list__item__quantity__price"
                taxedMoney={variant.pricing.price}
              />
              <ItemQuantity
                onAdd={() => onAdd(variant.id, 1)}
                onRemove={() => onSubtract(variant.id)}
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
