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
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  slug?: string;
  category?: ICategory;
  isAvailable?: boolean;
  thumbnail?: IImage  | null;
  thumbnail2x?: IImage | null;
  basePrice?: IMoney;
  pricing?: IProductPricing;
  // items in cart, checkout lines
  variant?: IProductVariant;
  // product list, product auna tile, product search result
  variants?: IProductVariant[];
  quantity?: number;
  quantityAvailable?: number | undefined;
}

export interface IProduct extends ISimpleProduct, IObjectWithMetadata {    
  purchaseCost?: IMoneyRange;
  minimalVariantPrice?: IMoney;
  updatedAt?: Date;
  chargeTaxes?: boolean;

  // todo implement complete data interfaces system
  // taxType?: TaxType
  // attributes?: SelectedAttribute[];
  // margin?: Margin
  // imageById(...)?: ProductImage
  // images?: [ProductImage]
  // collections?: [Collection]
  // translation(...)?: ProductTranslation
  // weight?: IWeight;
}
