import { IAddress } from "@types";
import { ICheckout } from '@sdk/api/Checkout/types';

export interface IProps {
  checkout?: ICheckout | undefined | null;
  address?: IAddress | null;
  email?: string;
}
