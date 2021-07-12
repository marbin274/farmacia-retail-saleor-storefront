import { UserDetails_me_cardTokens } from "@temp/@sdk/queries/gqlTypes/UserDetails";

export type IPaymentMethodsProps = {
  creditCards: UserDetails_me_cardTokens[];
  onClickAdd: () => void;
};
