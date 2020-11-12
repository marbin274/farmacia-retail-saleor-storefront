import * as React from "react";

import { ICheckoutModelLine } from "@sdk/repository";
import { Link } from "react-router-dom";
import { generateProductUrl } from "../../../core/utils";
import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import ItemQuantity from "./ItemQuantity";

// TODO: fix functionality to add items
const ProductList: React.FC<{
  lines: ICheckoutModelLine[];
  onQuantity?(variantId: string, quantity: number): void;
  onRemove(variantId: string): void;
}> = ({ lines, onQuantity, onRemove }) => (
  <ul className="cart__list">
    {lines.map((line, index) => {
      const productUrl = generateProductUrl(
        line.variant.product.id,
        line.variant.product.name
      );
      const key = line.id ? `id-${line.id}` : `idx-${index}`;

      return (
        <li key={key} className="cart__list__item">
          <Link to={productUrl}>
            <Thumbnail source={line.variant.product} />
          </Link>
          <div className="cart__list__item__details">
            <div className="cart__list__item__up">
              <Link to={productUrl}>
                <p className="cart__list__item__details--name">
                  {line.variant.product.name}
                </p>
              </Link>
              <button
                className="cart__list__item__details--button"
                onClick={() => onRemove(line.variant.id)}
              >
                Eliminar
              </button>
            </div>
            <div className="cart__list__item__down">
              <TaxedMoney
                className="cart__list__item__quantity__price"
                taxedMoney={line.variant.pricing.price}
              />
              <ItemQuantity
                value={line.quantity.toString()}
                onAdd={() => onQuantity(line.variant.id, 1)}
                onRemove={() => onQuantity(line.variant.id, -1)}
              />
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
