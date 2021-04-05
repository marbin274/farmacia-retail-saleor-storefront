import * as React from "react";

const CostRow: React.FC<{
  mediumScreen: boolean;
  heading: string;
  cost: React.ReactNode;
  bold?: boolean;
}> = ({ mediumScreen, heading, cost, bold }) => (
  <tr className={`cart-table__cost-wrapper${bold && "--bold"}`}>
    <td colSpan={mediumScreen ? 4 : 3} className="cart-table__cost">
      {heading}
    </td>
    <td colSpan={2} className="cart-table__cost-value">
      {cost}
    </td>
  </tr>
);

export default CostRow;
