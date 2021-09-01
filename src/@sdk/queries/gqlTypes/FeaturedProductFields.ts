/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeaturedProductFields
// ====================================================

export interface FeaturedProductFields_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface FeaturedProductFields_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProductFields_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProductFields_pricing_priceRangeUndiscounted_start_net;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProductFields_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProductFields_pricing_priceRangeUndiscounted_stop_net;
}

export interface FeaturedProductFields_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProductFields_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProductFields_pricing_priceRangeUndiscounted_stop | null;
}

export interface FeaturedProductFields_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProductFields_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProductFields_pricing_priceRange_start_net;
}

export interface FeaturedProductFields_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProductFields_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProductFields_pricing_priceRange_stop_net;
}

export interface FeaturedProductFields_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProductFields_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProductFields_pricing_priceRange_stop | null;
}

export interface FeaturedProductFields_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: FeaturedProductFields_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: FeaturedProductFields_pricing_priceRange | null;
}

export interface FeaturedProductFields_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface FeaturedProductFields_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
}

export interface FeaturedProductFields_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: FeaturedProductFields_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (FeaturedProductFields_attributes_values | null)[];
}

export interface FeaturedProductFields_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FeaturedProductFields_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProductFields_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProductFields_variants_pricing_price_net;
}

export interface FeaturedProductFields_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Culture Code.
   */
  culture: string;
}

export interface FeaturedProductFields_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProductFields_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProductFields_variants_pricing_priceUndiscounted_net;
}

export interface FeaturedProductFields_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price, with any discount subtracted.
   */
  price: FeaturedProductFields_variants_pricing_price | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: FeaturedProductFields_variants_pricing_priceUndiscounted | null;
}

export interface FeaturedProductFields_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProductFields_variants_pricing | null;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface FeaturedProductFields {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: FeaturedProductFields_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: FeaturedProductFields_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProductFields_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: FeaturedProductFields_attributes[];
  category: FeaturedProductFields_category | null;
  /**
   * List of variants for the product.
   */
  variants: (FeaturedProductFields_variants | null)[] | null;
}
