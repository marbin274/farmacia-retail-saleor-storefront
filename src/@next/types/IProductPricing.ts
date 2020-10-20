import { ITaxedMoney, ITaxedMoneyRange } from "@app/types/IMoney";

export interface IProductPricing {
  onSale?: boolean;
  discount?: ITaxedMoney;
  discountLocalCurrency?: ITaxedMoney;
  priceRange?: ITaxedMoneyRange;
  priceRangeLocalCurrency?: ITaxedMoneyRange;
  priceRangeUndiscounted?:ITaxedMoneyRange;
}
