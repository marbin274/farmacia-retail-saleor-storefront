export interface IProps {
  money?: {
    amount: number;
    currency: string;
    culture: string;
  } | null;
  negative?: boolean;
  defaultValue?: string;
  className?: string;
}
