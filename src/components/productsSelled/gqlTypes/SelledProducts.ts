/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReportingPeriod } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SelledProducts
// ====================================================

export interface SelledProducts_reportProductSales_edges_node_revenue_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SelledProducts_reportProductSales_edges_node_revenue {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_revenue_gross;
}

export interface SelledProducts_reportProductSales_edges_node_attributes_values {
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

export interface SelledProducts_reportProductSales_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Values of an attribute.
   */
  values: (SelledProducts_reportProductSales_edges_node_attributes_values | null)[];
}

export interface SelledProducts_reportProductSales_edges_node_product_thumbnail {
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

export interface SelledProducts_reportProductSales_edges_node_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_start_gross {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_start_net {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_start_net;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_stop_gross {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_stop_net {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_stop_net;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted_stop | null;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_start_gross {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_start_net {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_start_net;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_stop_gross {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_stop_net {
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

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_stop_net;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange_stop | null;
}

export interface SelledProducts_reportProductSales_edges_node_product_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: SelledProducts_reportProductSales_edges_node_product_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SelledProducts_reportProductSales_edges_node_product_pricing_priceRange | null;
}

export interface SelledProducts_reportProductSales_edges_node_product_attributes_attribute {
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

export interface SelledProducts_reportProductSales_edges_node_product_attributes_values {
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

export interface SelledProducts_reportProductSales_edges_node_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SelledProducts_reportProductSales_edges_node_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SelledProducts_reportProductSales_edges_node_product_attributes_values | null)[];
}

export interface SelledProducts_reportProductSales_edges_node_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing_price_gross {
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

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing_price_net {
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

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_product_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: SelledProducts_reportProductSales_edges_node_product_variants_pricing_price_net;
}

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing_priceUndiscounted_gross {
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

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing_priceUndiscounted_net {
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

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: SelledProducts_reportProductSales_edges_node_product_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: SelledProducts_reportProductSales_edges_node_product_variants_pricing_priceUndiscounted_net;
}

export interface SelledProducts_reportProductSales_edges_node_product_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price, with any discount subtracted.
   */
  price: SelledProducts_reportProductSales_edges_node_product_variants_pricing_price | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: SelledProducts_reportProductSales_edges_node_product_variants_pricing_priceUndiscounted | null;
}

export interface SelledProducts_reportProductSales_edges_node_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SelledProducts_reportProductSales_edges_node_product_variants_pricing | null;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface SelledProducts_reportProductSales_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SelledProducts_reportProductSales_edges_node_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: SelledProducts_reportProductSales_edges_node_product_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SelledProducts_reportProductSales_edges_node_product_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: SelledProducts_reportProductSales_edges_node_product_attributes[];
  category: SelledProducts_reportProductSales_edges_node_product_category | null;
  /**
   * List of variants for the product.
   */
  variants: (SelledProducts_reportProductSales_edges_node_product_variants | null)[] | null;
}

export interface SelledProducts_reportProductSales_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Total revenue generated by a variant in given period of time. Note: this field
   * should be queried using `reportProductSales` query as it uses optimizations
   * suitable for such calculations.
   */
  revenue: SelledProducts_reportProductSales_edges_node_revenue | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: SelledProducts_reportProductSales_edges_node_attributes[];
  product: SelledProducts_reportProductSales_edges_node_product;
  /**
   * Total quantity ordered.
   */
  quantityOrdered: number | null;
}

export interface SelledProducts_reportProductSales_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SelledProducts_reportProductSales_edges_node;
}

export interface SelledProducts_reportProductSales {
  __typename: "ProductVariantCountableConnection";
  edges: SelledProducts_reportProductSales_edges[];
}

export interface SelledProducts {
  /**
   * List of top selling products.
   */
  reportProductSales: SelledProducts_reportProductSales | null;
}

export interface SelledProductsVariables {
  districtId?: string | null;
  period: ReportingPeriod;
  first?: number | null;
}
