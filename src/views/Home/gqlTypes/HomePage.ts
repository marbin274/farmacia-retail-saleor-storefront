/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePage
// ====================================================

export interface HomePage_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePage_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: HomePage_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface AnaliticTracking {
  tagManagerId: string | null;
  tagManagerAuth: string | null;
  tagManagerEnvironmentId: string | null;
}

export interface HomePage_shop {
  __typename: "Shop";
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: HomePage_shop_homepageCollection | null;

  analyticsConfig: AnaliticTracking;
}

export interface HomePage_products_edges_node_thumbnail {
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

export interface HomePage_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePage_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePage_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePage_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePage_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface HomePage_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePage_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePage_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface HomePage_products_edges_node_pricing_priceRange_start_gross {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRange_start_net {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePage_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePage_products_edges_node_pricing_priceRange_start_net;
}

export interface HomePage_products_edges_node_pricing_priceRange_stop_gross {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRange_stop_net {
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
   * culture code.
   */
  culture: string;
}

export interface HomePage_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: HomePage_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: HomePage_products_edges_node_pricing_priceRange_stop_net;
}

export interface HomePage_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: HomePage_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: HomePage_products_edges_node_pricing_priceRange_stop | null;
}

export interface HomePage_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: HomePage_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: HomePage_products_edges_node_pricing_priceRange | null;
}

export interface HomePage_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: HomePage_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: HomePage_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: HomePage_products_edges_node_pricing | null;
}

export interface HomePage_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: HomePage_products_edges_node;
}

export interface HomePage_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface HomePage_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: HomePage_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: HomePage_products_pageInfo;
}

export interface HomePage {
  /**
   * Return information about the shop.
   */
  shop: HomePage_shop;
  /**
   * List of the shop's products.
   */
  products: HomePage_products | null;
}

