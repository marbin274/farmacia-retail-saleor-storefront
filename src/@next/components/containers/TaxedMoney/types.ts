import { ITaxedMoney } from "@types";

export interface IProps {
  className?: string;
  defaultValue?: string;
  negative?: boolean;
  taxedMoney?: ITaxedMoney | null;
}
