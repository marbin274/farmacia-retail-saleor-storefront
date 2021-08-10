/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_paginatedProducts_edges_node_thumbnail {
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

export interface Collection_paginatedProducts_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface Collection_paginatedProducts_edges_node_pricing_priceRange_start_gross {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRange_start_net {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Collection_paginatedProducts_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Collection_paginatedProducts_edges_node_pricing_priceRange_start_net;
}

export interface Collection_paginatedProducts_edges_node_pricing_priceRange_stop_gross {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRange_stop_net {
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

export interface Collection_paginatedProducts_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Collection_paginatedProducts_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Collection_paginatedProducts_edges_node_pricing_priceRange_stop_net;
}

export interface Collection_paginatedProducts_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Collection_paginatedProducts_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Collection_paginatedProducts_edges_node_pricing_priceRange_stop | null;
}

export interface Collection_paginatedProducts_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: Collection_paginatedProducts_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: Collection_paginatedProducts_edges_node_pricing_priceRange | null;
}

export interface Collection_paginatedProducts_edges_node_attributes_attribute {
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

export interface Collection_paginatedProducts_edges_node_attributes_values {
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

export interface Collection_paginatedProducts_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: Collection_paginatedProducts_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (Collection_paginatedProducts_edges_node_attributes_values | null)[];
}

export interface Collection_paginatedProducts_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Collection_paginatedProducts_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface Collection_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface Collection_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface Collection_paginatedProducts_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Collection_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: Collection_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface Collection_paginatedProducts_edges_node_variants_pricing_price_gross {
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

export interface Collection_paginatedProducts_edges_node_variants_pricing_price_net {
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

export interface Collection_paginatedProducts_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Collection_paginatedProducts_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: Collection_paginatedProducts_edges_node_variants_pricing_price_net;
}

export interface Collection_paginatedProducts_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: Collection_paginatedProducts_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: Collection_paginatedProducts_edges_node_variants_pricing_price | null;
}

export interface Collection_paginatedProducts_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * List of images for the product variant.
   */
  images: (Collection_paginatedProducts_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Collection_paginatedProducts_edges_node_variants_pricing | null;
}

export interface Collection_paginatedProducts_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Collection_paginatedProducts_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: Collection_paginatedProducts_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Collection_paginatedProducts_edges_node_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: Collection_paginatedProducts_edges_node_attributes[];
  category: Collection_paginatedProducts_edges_node_category | null;
  /**
   * List of variants for the product.
   */
  variants: (Collection_paginatedProducts_edges_node_variants | null)[] | null;
}

export interface Collection_paginatedProducts_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Collection_paginatedProducts_edges_node;
}

export interface Collection_paginatedProducts {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: Collection_paginatedProducts_edges[];
}

export interface Collection_collection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Collection_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  backgroundImage: Collection_collection_backgroundImage | null;
}

export interface Collection_attributes_edges_node_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface Collection_attributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Whether the attribute can be filtered in storefront.
   */
  filterableInStorefront: boolean;
  /**
   * List of attribute's values.
   */
  values: (Collection_attributes_edges_node_values | null)[] | null;
}

export interface Collection_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Collection_attributes_edges_node;
}

export interface Collection_attributes {
  __typename: "AttributeCountableConnection";
  edges: Collection_attributes_edges[];
}

export interface Collection {
  paginatedProducts: Collection_paginatedProducts | null;
  /**
   * Look up a collection by ID.
   */
  collection: Collection_collection | null;
  /**
   * List of the shop's attributes.
   */
  attributes: Collection_attributes | null;
}

export interface CollectionVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  categories?: (string | null)[] | null;
  districtId?: string | null;
  page?: number | null;
  pageSize?: number | null;
  priceGte?: number | null;
  priceLte?: number | null;
  sortBy?: ProductOrder | null;
}
