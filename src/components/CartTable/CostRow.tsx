import * as React from "react";

const CostRow: React.FC<{
  mediumScreen: boolean;
  heading: string;
  cost: React.ReactNode;
  bold?: boolean;
}> = ({ mediumScreen, heading, cost, bold }) => (
  <tr className={`cart-table__cost-wrapper${bold && "--bold" || ''}`}>
    {
      mediumScreen && (
        <td colSpan={2}>
          &nbsp;
        </td>
      )
    }
    <td colSpan={2} className="fa-font-semibold fa-text-left md:fa-text-left">
      {heading}
    </td>
    <td colSpan={2} className="fa-font-semibold cart-table__cost-value">
      {cost}
    </td>
  </tr>
);

export default CostRow;
