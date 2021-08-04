/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange_start_gross {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange_start_net {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_paginatedProducts_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_paginatedProducts_edges_node_pricing_priceRange_start_net;
}

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange_stop_gross {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange_stop_net {
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

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_paginatedProducts_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_paginatedProducts_edges_node_pricing_priceRange_stop_net;
}

export interface SearchProducts_paginatedProducts_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SearchProducts_paginatedProducts_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SearchProducts_paginatedProducts_edges_node_pricing_priceRange_stop | null;
}

export interface SearchProducts_paginatedProducts_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: SearchProducts_paginatedProducts_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SearchProducts_paginatedProducts_edges_node_pricing_priceRange | null;
}

export interface SearchProducts_paginatedProducts_edges_node_attributes_attribute {
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

export interface SearchProducts_paginatedProducts_edges_node_attributes_values {
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
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface SearchProducts_paginatedProducts_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SearchProducts_paginatedProducts_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SearchProducts_paginatedProducts_edges_node_attributes_values | null)[];
}

export interface SearchProducts_paginatedProducts_edges_node_thumbnail {
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

export interface SearchProducts_paginatedProducts_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchProducts_paginatedProducts_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchProducts_paginatedProducts_edges_node_variants_images {
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

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing_price_gross {
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

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing_price_net {
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

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SearchProducts_paginatedProducts_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: SearchProducts_paginatedProducts_edges_node_variants_pricing_price_net;
}

export interface SearchProducts_paginatedProducts_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: SearchProducts_paginatedProducts_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: SearchProducts_paginatedProducts_edges_node_variants_pricing_price | null;
}

export interface SearchProducts_paginatedProducts_edges_node_variants {
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
  images: (SearchProducts_paginatedProducts_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SearchProducts_paginatedProducts_edges_node_variants_pricing | null;
}

export interface SearchProducts_paginatedProducts_edges_node {
  __typename: "Product";
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SearchProducts_paginatedProducts_edges_node_pricing | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: SearchProducts_paginatedProducts_edges_node_attributes[];
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SearchProducts_paginatedProducts_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: SearchProducts_paginatedProducts_edges_node_thumbnail2x | null;
  category: SearchProducts_paginatedProducts_edges_node_category | null;
  /**
   * List of variants for the product.
   */
  variants: (SearchProducts_paginatedProducts_edges_node_variants | null)[] | null;
}

export interface SearchProducts_paginatedProducts_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_paginatedProducts_edges_node;
}

export interface SearchProducts_paginatedProducts_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface SearchProducts_paginatedProducts {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: SearchProducts_paginatedProducts_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchProducts_paginatedProducts_pageInfo;
}

export interface SearchProducts_attributes_edges_node_values {
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

export interface SearchProducts_attributes_edges_node {
  __typename: "Attribute";
  /**
   * Whether the attribute can be filtered in storefront.
   */
  filterableInStorefront: boolean;
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
   * List of attribute's values.
   */
  values: (SearchProducts_attributes_edges_node_values | null)[] | null;
}

export interface SearchProducts_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProducts_attributes_edges_node;
}

export interface SearchProducts_attributes {
  __typename: "AttributeCountableConnection";
  edges: SearchProducts_attributes_edges[];
}

export interface SearchProducts {
  paginatedProducts: SearchProducts_paginatedProducts | null;
  /**
   * List of the shop's attributes.
   */
  attributes: SearchProducts_attributes | null;
}

export interface SearchProductsVariables {
  query: string;
  attributes?: (AttributeInput | null)[] | null;
  pageSize?: number | null;
  page?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
  districtId?: string | null;
}
