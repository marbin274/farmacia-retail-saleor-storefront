import { TaxedMoney } from "@components/containers";
import { ThumbnailTable } from "./styles";
import { ProductVariant } from "@sdk/fragments/gqlTypes/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@sdk/queries/gqlTypes/OrderByToken";
import * as React from "react";
import { Link } from "react-router-dom";
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
  smallScreen: boolean;
  line: ILine;
}

const ProductRow: React.FC<ReadProductRowProps> = ({ smallScreen, line }) => {
  const productUrl = generateProductUrl(line.product.id, line.product.name);

  return (
    <tr className="fa-border-b fa-border-solid fa-border-gray-04">
      <td>
        <div className="fa-flex fa-items-center">
          {smallScreen && (
            <Link to={productUrl}>
              <ThumbnailTable source={line.product} />
            </Link>
          )}
          <Link className="fa-text-xs" to={productUrl}>
            {line.product.name}
          </Link>
        </div>
      </td>

      <td className="lg:fa-font-semibold fa-text-neutral-dark lg:fa-text-black">
        <TaxedMoney taxedMoney={line.pricing.price} />
      </td>

      <td className="fa-font-semibold fa-text-center">
        <p>{line.quantity}</p>
      </td>

      <td colSpan={2} className="fa-font-semibold fa-text-right">
        <TaxedMoney taxedMoney={line.totalPrice} />
      </td>
    </tr>
  );
};

export default ProductRow;
