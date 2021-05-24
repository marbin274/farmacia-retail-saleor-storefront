import {IMoney, ITaxedMoney} from "@app/types/IMoney";
import {INode} from "@app/types/INode";
import {IObjectWithMetadata} from "@app/types/IObjectWithMetadata";
import {IProduct} from "@app/types/IProduct";
import {IProductVariantPricing} from "@app/types/IProductVariantPricing";


export interface IProductVariant extends INode, IObjectWithMetadata{
  name?: string;
  sku?: string | null;
  product?: IProduct;
  trackInventory?: boolean;
  costPrice?: IMoney;
  margin?: number;
  quantityOrdered?: number
  priceOverride?: IMoney;
  pricing?: IProductVariantPricing | null | undefined;
  revenue?: ITaxedMoney;
  quantityAvailable?: number;
}