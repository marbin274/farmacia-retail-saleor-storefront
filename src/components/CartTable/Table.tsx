import { useMediaScreen } from '@temp/@next/globalStyles';
import { smallScreen } from '@styles/constants';
import * as React from 'react';
import CostRow from './CostRow';
import ProductRow, { ILine } from './ProductRow';
import * as S from './styles';

interface TableProps {
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
}) => {
  const { isCustomMinScreen: isSmallScreen } = useMediaScreen(
    smallScreen.toString()
  );
  return (
    <S.Table className="fa-m-0 fa-text-xs sm:fa-text-sm">
      <thead>
        <tr className="fa-border-b fa-border-solid fa-border-gray-04">
          <th className="fa-px-0 fa-py-1 lg:fa-px-2 lg:fa-py-4">Productos</th>
          <th className="fa-px-0 fa-py-1 lg:fa-px-2 lg:fa-py-4">Precio</th>
          <th className="fa-text-center">Cantidad</th>
          <th colSpan={2} className="fa-text-right">
            Subtotal
          </th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line) => (
          <ProductRow
            key={line.id}
            line={line}
            smallScreen={isSmallScreen}
            {...rowProps}
          />
        ))}
      </tbody>
      <tfoot>
        <CostRow
          smallScreen={isSmallScreen}
          heading="Subtotal"
          cost={subtotal}
        />
        {discount && (
          <CostRow
            smallScreen={isSmallScreen}
            heading={`Descuento: ${discountName}`}
            cost={discount}
          />
        )}
        {deliveryCost && (
          <CostRow
            smallScreen={isSmallScreen}
            heading="Costo del delivery"
            cost={deliveryCost}
          />
        )}
        {totalCost && (
          <CostRow
            smallScreen={isSmallScreen}
            heading="Total"
            cost={totalCost}
            bold
          />
        )}
      </tfoot>
    </S.Table>
  );
};

export default Table;
