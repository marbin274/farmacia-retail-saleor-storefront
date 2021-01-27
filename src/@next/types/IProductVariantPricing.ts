import { ITaxedMoney } from "@app/types/IMoney";

export interface IProductVariantPricing {
  onSale?: boolean | null;
  discount?: ITaxedMoney;
  discountLocalCurrency?: ITaxedMoney;
  price?: ITaxedMoney | null;
  priceLocalCurrency?: ITaxedMoney;
  priceUndiscounted?:ITaxedMoney | null;
}
