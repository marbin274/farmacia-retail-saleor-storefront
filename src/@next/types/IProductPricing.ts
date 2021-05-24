import { ITaxedMoney, ITaxedMoneyRange } from "@app/types/IMoney";

export interface IProductPricing {
  onSale?: boolean | null;
  discount?: ITaxedMoney;
  discountLocalCurrency?: ITaxedMoney;
  priceRange?: ITaxedMoneyRange | null;
  priceRangeLocalCurrency?: ITaxedMoneyRange;
  priceRangeUndiscounted?:ITaxedMoneyRange | null;
}
