import { ICategory } from "@app/types/ICategory";
import { IImage } from "@app/types/IImage";
import { IMoney, IMoneyRange } from "@app/types/IMoney";
import { INode } from "@app/types/INode";
import { IObjectWithMetadata } from "@app/types/IObjectWithMetadata";
import { IProductPricing } from "@app/types/IProductPricing";
import { IProductVariant } from "@app/types/IProductVariant";
import { ProductDetails_product_attributes } from "@temp/@sdk/queries/gqlTypes/ProductDetails";

export interface ISimpleProduct extends INode {
  attributes?: ProductDetails_product_attributes[];
  name: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  isPublished?: boolean;
  slug?: string;
  category?: ICategory | null;
  isAvailable?: boolean | null;
  thumbnail?: IImage  | null;
  thumbnail2x?: IImage | null;
  basePrice?: IMoney;
  pricing?: IProductPricing | null;
  variant?: IProductVariant | null;
  quantity?: number;
  quantityAvailable?: number | undefined;
}

export interface IProduct extends ISimpleProduct, IObjectWithMetadata {    
  purchaseCost?: IMoneyRange;
  minimalVariantPrice?: IMoney;
  updatedAt?: Date;
  chargeTaxes?: boolean;
}
