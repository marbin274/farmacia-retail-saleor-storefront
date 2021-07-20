import { UserDetails_me_cardTokens } from "@temp/@sdk/queries/gqlTypes/UserDetails";

export type ICreditCardItemProps = {
  creditCard: UserDetails_me_cardTokens;
  selected?: boolean;
  className?: string;
  onClickSelect?: (id: string) => void;
};
