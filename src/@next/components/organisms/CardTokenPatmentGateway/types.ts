import { UserDetails_me_cardTokens } from "@temp/@sdk/queries/gqlTypes/UserDetails";

export type ICardTokenPaymentGatewayProps = {
  cardTokens: UserDetails_me_cardTokens[];
  onSelectCardToken: (id: string) => void;
  selectedCardTokenId?: string;
};
