import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { ProductVariant } from "@sdk/fragments/gqlTypes/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@sdk/queries/gqlTypes/OrderByToken";

import { generateProductUrl } from "../../core/utils";

export type ILine = Omit<
  ProductVariant,
  "__typename" | "sku" | "quantityAvailable" | "isAvailable"
> & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  quantityAvailable?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: ILine;
}

export interface EditableProductRowProps {
  processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  mediumScreen,
  processing,
  line,
}) => {
  const productUrl = generateProductUrl(line.product.id, line.product.name);

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <Link to={productUrl}>
              <Thumbnail source={line.product} />
            </Link>
          )}
          <Link to={productUrl}>{line.product.name}</Link>
        </div>
      </td>

      <td>
        <TaxedMoney taxedMoney={line.pricing.price} />
      </td>

      <td className="cart-table__quantity-cell">
        <p>{line.quantity}</p>
      </td>

      <td colSpan={2} className="cart-table__total-cell" >
        <TaxedMoney taxedMoney={line.totalPrice} />
      </td>
    </tr>
  );
};

export default ProductRow;
