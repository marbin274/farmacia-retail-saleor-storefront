import {IMoney, ITaxedMoney} from "@app/types/IMoney";
import {INode} from "@app/types/INode";
import {IObjectWithMetadata} from "@app/types/IObjectWithMetadata";
import {IProduct} from "@app/types/IProduct";
import {IProductVariantPricing} from "@app/types/IProductVariantPricing";


export interface IProductVariant extends INode, IObjectWithMetadata{
  name?: string;
  sku?: string
  product?: IProduct;
  trackInventory?: boolean;
  costPrice?: IMoney;
  margin?: number;
  quantityOrdered?: number
  priceOverride?: IMoney;
  pricing?: IProductVariantPricing;
  revenue?: ITaxedMoney;
  quantityAvailable?: number;

  // todo implement complete data interfaces system
  // attributes?: [SelectedAttribute!]!
  // images?: [IProductImage];
  // translation?: IProductVariantTranslation;
  // digitalContent?: IDigitalContent
  // stocks?: [IStock]
  // weight?: IWeight;
}