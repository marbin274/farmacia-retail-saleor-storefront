import { Checkout_availableShippingMethods_price } from '@temp/@sdk/fragments/gqlTypes/Checkout';

export interface IProps {
  shippingMethodId: string;
  index: number;
  isScheduled: boolean | null;
  name: string;
  price: Checkout_availableShippingMethods_price | null;
  selected: boolean;
  subtitle?: string | null;
}
