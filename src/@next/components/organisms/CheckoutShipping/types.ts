import { IFormError } from "@types";

export interface IShippingMethodPrice {
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture code.
   */
  culture: string;
}

export interface IShippingMethod {
  /**
   * The ID of the shipping method.
   */
  id: string;
  name: string;
  price: IShippingMethodPrice | null;
}

export interface IProps {
  shippingMethods: IShippingMethod[];
  selectedShippingMethodId?: string;
  selectShippingMethod?: (shippingMethodId: string) => void;
  errors?: IFormError[];
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
}
