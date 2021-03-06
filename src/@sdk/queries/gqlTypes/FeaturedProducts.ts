/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionSortingInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: FeaturedProducts
// ====================================================

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_thumbnail {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_start_net;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_stop_net;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_attributes_attribute {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_attributes_values {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_attributes_values | null)[];
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price, with any discount subtracted.
   */
  price: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_price | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants_pricing | null;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_attributes[];
  category: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_category | null;
  /**
   * List of variants for the product.
   */
  variants: (FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node_variants | null)[] | null;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FeaturedProducts_shop_homepageCollections_edges_node_products_edges_node;
}

export interface FeaturedProducts_shop_homepageCollections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: FeaturedProducts_shop_homepageCollections_edges_node_products_edges[];
}

export interface FeaturedProducts_shop_homepageCollections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of products in this collection.
   */
  products: FeaturedProducts_shop_homepageCollections_edges_node_products | null;
}

export interface FeaturedProducts_shop_homepageCollections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FeaturedProducts_shop_homepageCollections_edges_node;
}

export interface FeaturedProducts_shop_homepageCollections {
  __typename: "CollectionCountableConnection";
  edges: FeaturedProducts_shop_homepageCollections_edges[];
}

export interface FeaturedProducts_shop {
  __typename: "Shop";
  /**
   * List of the shop's product types.
   */
  homepageCollections: FeaturedProducts_shop_homepageCollections | null;
}

export interface FeaturedProducts_personalized_thumbnail {
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

export interface FeaturedProducts_personalized_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted_start_gross {
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

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted_start_net {
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

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_personalized_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_personalized_pricing_priceRangeUndiscounted_start_net;
}

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted_stop_gross {
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

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted_stop_net {
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

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_personalized_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_personalized_pricing_priceRangeUndiscounted_stop_net;
}

export interface FeaturedProducts_personalized_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_personalized_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_personalized_pricing_priceRangeUndiscounted_stop | null;
}

export interface FeaturedProducts_personalized_pricing_priceRange_start_gross {
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

export interface FeaturedProducts_personalized_pricing_priceRange_start_net {
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

export interface FeaturedProducts_personalized_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_personalized_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_personalized_pricing_priceRange_start_net;
}

export interface FeaturedProducts_personalized_pricing_priceRange_stop_gross {
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

export interface FeaturedProducts_personalized_pricing_priceRange_stop_net {
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

export interface FeaturedProducts_personalized_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_personalized_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_personalized_pricing_priceRange_stop_net;
}

export interface FeaturedProducts_personalized_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_personalized_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_personalized_pricing_priceRange_stop | null;
}

export interface FeaturedProducts_personalized_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: FeaturedProducts_personalized_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: FeaturedProducts_personalized_pricing_priceRange | null;
}

export interface FeaturedProducts_personalized_attributes_attribute {
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

export interface FeaturedProducts_personalized_attributes_values {
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

export interface FeaturedProducts_personalized_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: FeaturedProducts_personalized_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (FeaturedProducts_personalized_attributes_values | null)[];
}

export interface FeaturedProducts_personalized_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FeaturedProducts_personalized_variants_pricing_price_gross {
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

export interface FeaturedProducts_personalized_variants_pricing_price_net {
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

export interface FeaturedProducts_personalized_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_personalized_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_personalized_variants_pricing_price_net;
}

export interface FeaturedProducts_personalized_variants_pricing_priceUndiscounted_gross {
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

export interface FeaturedProducts_personalized_variants_pricing_priceUndiscounted_net {
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

export interface FeaturedProducts_personalized_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_personalized_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_personalized_variants_pricing_priceUndiscounted_net;
}

export interface FeaturedProducts_personalized_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price, with any discount subtracted.
   */
  price: FeaturedProducts_personalized_variants_pricing_price | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: FeaturedProducts_personalized_variants_pricing_priceUndiscounted | null;
}

export interface FeaturedProducts_personalized_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_personalized_variants_pricing | null;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface FeaturedProducts_personalized {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: FeaturedProducts_personalized_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: FeaturedProducts_personalized_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_personalized_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: FeaturedProducts_personalized_attributes[];
  category: FeaturedProducts_personalized_category | null;
  /**
   * List of variants for the product.
   */
  variants: (FeaturedProducts_personalized_variants | null)[] | null;
}

export interface FeaturedProducts {
  /**
   * Return information about the shop.
   */
  shop: FeaturedProducts_shop;
  /**
   * List of recommended products for an authenticated user.
   */
  personalized: (FeaturedProducts_personalized | null)[] | null;
}

export interface FeaturedProductsVariables {
  first: number;
  firstPersonalize: number;
  districtId?: string | null;
  firstCollection?: number | null;
  sortBy?: CollectionSortingInput | null;
}
