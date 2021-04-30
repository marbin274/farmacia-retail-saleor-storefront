export interface IProps {
  checked?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  name: string;
  onChange?: (event: React.SyntheticEvent) => void;
}
