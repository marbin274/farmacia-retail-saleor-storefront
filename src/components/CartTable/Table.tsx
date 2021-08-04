import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";
import * as S from "./styles";
import * as React from "react";
import Media from "react-media";

import CostRow from "./CostRow";
import ProductRow, { EditableProductRowProps, ILine } from "./ProductRow";

interface TableProps extends EditableProductRowProps {
  lines: ILine[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: string;
}

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  totalCost,
  discount,
  discountName,
  lines,
  ...rowProps
}) => (
  <Media query={{ minWidth: smallScreen }}>
    {mediumScreen => (
      <S.Table className="cart-table" style={{margin: 0}}>
        <thead>
          <tr>
            <th>Productos</th>
            <th>Precio</th>
            <th className="cart-table__quantity-header">Cantidad</th>
            <th colSpan={2} className="cart-table__total-header">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(line => (
            <ProductRow
              key={line.id}
              line={line}
              mediumScreen={mediumScreen}
              {...rowProps}
            />
          ))}
        </tbody>
        <tfoot>
          <CostRow
            mediumScreen={mediumScreen}
            heading="Subtotal"
            cost={subtotal}
          />
          {discount && (
            <CostRow
              mediumScreen={mediumScreen}
              heading={`Descuento: ${discountName}`}
              cost={discount}
            />
          )}
          {deliveryCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading="Costo del delivery"
              cost={deliveryCost}
            />
          )}
          {totalCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading="Total"
              cost={totalCost}
              bold
            />
          )}
        </tfoot>
      </S.Table>
    )}
  </Media>
);

export default Table;
