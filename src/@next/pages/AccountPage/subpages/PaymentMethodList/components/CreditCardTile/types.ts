import { UserDetails_me_cardTokens } from "@temp/@sdk/queries/gqlTypes/UserDetails";

export type ICreditCardTileProps = {
  creditCard: UserDetails_me_cardTokens;
  onClickSetDefault: (id: string) => void;
  onClickDelete: (id: string) => void;
};
