import classNames from "classnames";
import * as React from "react";

const CostRow: React.FC<{
  smallScreen: boolean;
  heading: string;
  cost: React.ReactNode;
  bold?: boolean;
}> = ({ smallScreen, heading, cost, bold }) => (
  <tr className={classNames("fa-border-b-0", { "fa-font-bold": bold })}>
    {smallScreen && <td colSpan={2}>&nbsp;</td>}
    <td colSpan={2} className="fa-font-semibold fa-text-left md:fa-text-left">
      {heading}
    </td>
    <td colSpan={2} className="fa-font-semibold fa-text-right">
      {cost}
    </td>
  </tr>
);

export default CostRow;
