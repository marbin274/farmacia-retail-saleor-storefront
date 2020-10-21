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
  add?(variantId: string, quantity: number): void;
  remove(variantId: string): void;
}> = ({ lines, add, remove }) => (
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
            <Link to={productUrl}>
              <p className="cart__list__item__details--name">
                {line.variant.product.name}
              </p>
            </Link>
            <p className="cart__list__item__details--variant">
              {line.variant.name}
            </p>

            <div className="cart__list__item__down">
              <ItemQuantity
              value={line.quantity.toString()}
              onAdd={() => add(line.variant.id, 1)}
              onRemove={() => remove(line.variant.id)}
              />
              <TaxedMoney
                className="cart__list__item__quantity__price"
                taxedMoney={line.variant.pricing.price}
              />
            </div>
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
