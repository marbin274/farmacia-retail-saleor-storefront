import { ITaxedMoney } from "@app/types/IMoney";

export interface IProductVariantPricing {
  onSale?: boolean;
  discount?: ITaxedMoney;
  discountLocalCurrency?: ITaxedMoney;
  price?: ITaxedMoney;
  priceLocalCurrency?: ITaxedMoney;
  priceUndiscounted?:ITaxedMoney;
}
