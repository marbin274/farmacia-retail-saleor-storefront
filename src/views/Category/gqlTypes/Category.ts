/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_paginatedProducts_edges_node_thumbnail {
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

export interface Category_paginatedProducts_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface Category_paginatedProducts_edges_node_pricing_priceRange_start_gross {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRange_start_net {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Category_paginatedProducts_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Category_paginatedProducts_edges_node_pricing_priceRange_start_net;
}

export interface Category_paginatedProducts_edges_node_pricing_priceRange_stop_gross {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRange_stop_net {
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

export interface Category_paginatedProducts_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Category_paginatedProducts_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Category_paginatedProducts_edges_node_pricing_priceRange_stop_net;
}

export interface Category_paginatedProducts_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Category_paginatedProducts_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Category_paginatedProducts_edges_node_pricing_priceRange_stop | null;
}

export interface Category_paginatedProducts_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: Category_paginatedProducts_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: Category_paginatedProducts_edges_node_pricing_priceRange | null;
}

export interface Category_paginatedProducts_edges_node_attributes_attribute {
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

export interface Category_paginatedProducts_edges_node_attributes_values {
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

export interface Category_paginatedProducts_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: Category_paginatedProducts_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (Category_paginatedProducts_edges_node_attributes_values | null)[];
}

export interface Category_paginatedProducts_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_paginatedProducts_edges_node_variants_images {
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

export interface Category_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface Category_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface Category_paginatedProducts_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Category_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: Category_paginatedProducts_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface Category_paginatedProducts_edges_node_variants_pricing_price_gross {
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

export interface Category_paginatedProducts_edges_node_variants_pricing_price_net {
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

export interface Category_paginatedProducts_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Category_paginatedProducts_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: Category_paginatedProducts_edges_node_variants_pricing_price_net;
}

export interface Category_paginatedProducts_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: Category_paginatedProducts_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: Category_paginatedProducts_edges_node_variants_pricing_price | null;
}

export interface Category_paginatedProducts_edges_node_variants {
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
  images: (Category_paginatedProducts_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Category_paginatedProducts_edges_node_variants_pricing | null;
}

export interface Category_paginatedProducts_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Category_paginatedProducts_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: Category_paginatedProducts_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Category_paginatedProducts_edges_node_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: Category_paginatedProducts_edges_node_attributes[];
  category: Category_paginatedProducts_edges_node_category | null;
  /**
   * List of variants for the product.
   */
  variants: (Category_paginatedProducts_edges_node_variants | null)[] | null;
}

export interface Category_paginatedProducts_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Category_paginatedProducts_edges_node;
}

export interface Category_paginatedProducts {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: Category_paginatedProducts_edges[];
}

export interface Category_category_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Category_category_ancestors_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Category_category_ancestors_edges_node;
}

export interface Category_category_ancestors {
  __typename: "CategoryCountableConnection";
  edges: Category_category_ancestors_edges[];
}

export interface Category_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: Category_category_backgroundImage | null;
  /**
   * List of ancestors of the category.
   */
  ancestors: Category_category_ancestors | null;
}

export interface Category_attributes_edges_node_values {
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

export interface Category_attributes_edges_node {
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
  values: (Category_attributes_edges_node_values | null)[] | null;
}

export interface Category_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Category_attributes_edges_node;
}

export interface Category_attributes {
  __typename: "AttributeCountableConnection";
  edges: Category_attributes_edges[];
}

export interface Category_shop_navigation_main_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_shop_navigation_main_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_shop_navigation_main_items_page {
  __typename: "Page";
  slug: string;
}

export interface Category_shop_navigation_main_items_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Category_shop_navigation_main_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_shop_navigation_main_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_shop_navigation_main_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface Category_shop_navigation_main_items_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Category_shop_navigation_main_items_children_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_shop_navigation_main_items_children_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_shop_navigation_main_items_children_children_page {
  __typename: "Page";
  slug: string;
}

export interface Category_shop_navigation_main_items_children_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface Category_shop_navigation_main_items_children_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: Category_shop_navigation_main_items_children_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: Category_shop_navigation_main_items_children_children_collection | null;
  page: Category_shop_navigation_main_items_children_children_page | null;
  parent: Category_shop_navigation_main_items_children_children_parent | null;
}

export interface Category_shop_navigation_main_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: Category_shop_navigation_main_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: Category_shop_navigation_main_items_children_collection | null;
  page: Category_shop_navigation_main_items_children_page | null;
  parent: Category_shop_navigation_main_items_children_parent | null;
  children: (Category_shop_navigation_main_items_children_children | null)[] | null;
}

export interface Category_shop_navigation_main_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: Category_shop_navigation_main_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: Category_shop_navigation_main_items_collection | null;
  page: Category_shop_navigation_main_items_page | null;
  parent: Category_shop_navigation_main_items_parent | null;
  children: (Category_shop_navigation_main_items_children | null)[] | null;
}

export interface Category_shop_navigation_main {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  items: (Category_shop_navigation_main_items | null)[] | null;
}

export interface Category_shop_navigation {
  __typename: "Navigation";
  /**
   * Main navigation bar.
   */
  main: Category_shop_navigation_main | null;
}

export interface Category_shop {
  __typename: "Shop";
  /**
   * Shop's navigation.
   */
  navigation: Category_shop_navigation | null;
}

export interface Category {
  paginatedProducts: Category_paginatedProducts | null;
  /**
   * Look up a category by ID or slug.
   */
  category: Category_category | null;
  /**
   * List of the shop's attributes.
   */
  attributes: Category_attributes | null;
  /**
   * Return information about the shop.
   */
  shop: Category_shop;
}

export interface CategoryVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  pageSize?: number | null;
  page?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
