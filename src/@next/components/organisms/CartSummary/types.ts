import { IItems } from "@temp/@sdk/api/Cart/types";
import { IImage, IProductVariant, ITaxedMoney } from "@types";

export interface ICostLine {
  cost: ITaxedMoney;
  name: string;
  negative?: boolean;
  last?: boolean;
}

export interface ICosts {
  promoCode?: ITaxedMoney | null;
  subtotal?: ITaxedMoney | null;
  shipping?: ITaxedMoney | null;
  total?: ITaxedMoney | null;
}

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  thumbnail: IImage;
  variant: IProductVariant;
}

export interface IProps extends ICosts {
  products?: IItems;
  activeStepIndex: number;
  onClickHandle: () => void;
}
