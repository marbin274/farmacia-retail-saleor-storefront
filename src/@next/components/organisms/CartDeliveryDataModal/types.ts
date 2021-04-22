import { ICheckout } from "@temp/@sdk/api/Checkout/types";

export interface IProps {
  checkout: ICheckout | undefined;
  hideModal: () => void;
  target?: HTMLElement | null;
  formId?: string;
  title: string;
}
