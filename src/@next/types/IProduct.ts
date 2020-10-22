import { ICategory } from "@app/types/ICategory";
import { IImage } from "@app/types/IImage";
import {IMoney, IMoneyRange} from "@app/types/IMoney";
import { INode } from "@app/types/INode";
import { IObjectWithMetadata } from "@app/types/IObjectWithMetadata";
import {IProductPricing} from "@app/types/IProductPricing";
import {IProductType} from "@app/types/IProductType";
import { IProductVariant } from "@app/types/IProductVariant";

export interface ISimpleProduct extends INode{
  name: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished?: boolean;
  slug?: string;
  category?: ICategory;
  isAvailable?: boolean;
  thumbnail: IImage;
  thumbnail2x: IImage;
  basePrice?: IMoney;
  pricing?: IProductPricing;
  variants?: IProductVariant[];
}

export interface IProduct extends ISimpleProduct, IObjectWithMetadata {
  productType?: IProductType;
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