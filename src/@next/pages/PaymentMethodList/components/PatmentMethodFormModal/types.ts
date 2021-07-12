import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";

export type IPaymentMethodFormModalProps = {
  show: boolean;
  onClose: () => void;
  user: UserDetails_me;
};
