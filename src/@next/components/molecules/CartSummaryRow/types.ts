import { IImage, ITaxedMoney } from "@types";

export interface IProps {
  canAddToCart: boolean;
  index?: number;
  isOnSale: boolean;
  name: string;
  sku: string;
  quantity: number;
  price?: ITaxedMoney | null;
  thumbnail?: IImage | null;
}
