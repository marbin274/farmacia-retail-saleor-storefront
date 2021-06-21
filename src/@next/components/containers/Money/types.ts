export interface IProps {
  money?: {
    amount: number;
    currency: string;
    culture: string;
  } | null;
  defaultValue?: string;
  className?: string;
}
