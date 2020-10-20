import {INode} from "@app/types/INode";
import {IObjectWithMetadata} from "@app/types/IObjectWithMetadata";

export interface IProductType extends INode, IObjectWithMetadata {
  name?: string;
  slug?: string;

  hasVariants?: boolean;
  isShippingRequired?: boolean;
  isDigital?: boolean;

  // todo implement complete data interfaces system
  // weight?: Weight
  // products(...)?: ProductCountableConnection
  // taxRate?: TaxRateType
  // taxType?: TaxType
  // variantAttributes?: [Attribute]
  // productAttributes?: [Attribute]
  // availableAttributes(...)?: AttributeCountableConnection
}
