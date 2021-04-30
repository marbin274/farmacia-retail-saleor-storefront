export interface IProps {
  checkoutId?:string;
  loading?: boolean;
  navigation?: React.ReactNode;
  checkout?: React.ReactNode;
  cartSummary?: React.ReactNode;
  button?: React.ReactNode;
  selectedPaymentGateway?: string;
}
