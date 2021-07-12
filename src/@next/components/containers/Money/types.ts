export interface IProps {
  className?: string;
  defaultValue?: string;
  money?: {
    amount: number;
    currency: string;
    culture: string;
  } | null;
  negative?: boolean;
}
