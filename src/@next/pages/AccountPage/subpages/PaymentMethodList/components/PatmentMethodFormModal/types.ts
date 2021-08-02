import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import { ICardTokenizationResult } from "@temp/core/payments/niubiz";

export type IPaymentMethodFormModalProps = {
  formRef?: React.RefObject<HTMLFormElement>;
  show: boolean;
  user: UserDetails_me;
  onClose: () => void;
  onSubmit: (data: ICardTokenizationResult) => void;
  loading?: boolean;
};
