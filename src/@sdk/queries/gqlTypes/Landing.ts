/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Landing
// ====================================================

export interface Landing_landing_banner_frames_images {
  __typename: "BannerImage";
  /**
   * The screen type of the image
   */
  screenType: string;
  /**
   * The image's URL
   */
  url: string;
}

export interface Landing_landing_banner_frames {
  __typename: "BannerFrame";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Frame action link
   */
  link: string | null;
  /**
   * Lis of banner images
   */
  images: (Landing_landing_banner_frames_images | null)[] | null;
}

export interface Landing_landing_banner {
  __typename: "Banner";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The frames containing images for each screen
   */
  frames: (Landing_landing_banner_frames | null)[] | null;
}

export interface Landing_landing_collections_edges_node_products_edges_node_thumbnail {
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

export interface Landing_landing_collections_edges_node_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_start_gross {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_start_net {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_start_net;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_stop_net {
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

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_stop_net;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange_stop | null;
}

export interface Landing_landing_collections_edges_node_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: Landing_landing_collections_edges_node_products_edges_node_pricing_priceRange | null;
}

export interface Landing_landing_collections_edges_node_products_edges_node_attributes_attribute {
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

export interface Landing_landing_collections_edges_node_products_edges_node_attributes_values {
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

export interface Landing_landing_collections_edges_node_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: Landing_landing_collections_edges_node_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (Landing_landing_collections_edges_node_products_edges_node_attributes_values | null)[];
}

export interface Landing_landing_collections_edges_node_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing_price_gross {
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

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing_price_net {
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

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Landing_landing_collections_edges_node_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: Landing_landing_collections_edges_node_products_edges_node_variants_pricing_price_net;
}

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross {
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

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net {
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

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Landing_landing_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: Landing_landing_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface Landing_landing_collections_edges_node_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price, with any discount subtracted.
   */
  price: Landing_landing_collections_edges_node_products_edges_node_variants_pricing_price | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: Landing_landing_collections_edges_node_products_edges_node_variants_pricing_priceUndiscounted | null;
}

export interface Landing_landing_collections_edges_node_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Landing_landing_collections_edges_node_products_edges_node_variants_pricing | null;
}

export interface Landing_landing_collections_edges_node_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Landing_landing_collections_edges_node_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: Landing_landing_collections_edges_node_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: Landing_landing_collections_edges_node_products_edges_node_pricing | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: Landing_landing_collections_edges_node_products_edges_node_attributes[];
  category: Landing_landing_collections_edges_node_products_edges_node_category | null;
  /**
   * List of variants for the product.
   */
  variants: (Landing_landing_collections_edges_node_products_edges_node_variants | null)[] | null;
}

export interface Landing_landing_collections_edges_node_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Landing_landing_collections_edges_node_products_edges_node;
}

export interface Landing_landing_collections_edges_node_products {
  __typename: "ProductCountableConnection";
  edges: Landing_landing_collections_edges_node_products_edges[];
}

export interface Landing_landing_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of products in this collection.
   */
  products: Landing_landing_collections_edges_node_products | null;
}

export interface Landing_landing_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Landing_landing_collections_edges_node;
}

export interface Landing_landing_collections {
  __typename: "CollectionCountableConnection";
  edges: Landing_landing_collections_edges[];
}

export interface Landing_landing {
  __typename: "Landing";
  title: string;
  banner: Landing_landing_banner | null;
  collections: Landing_landing_collections;
}

export interface Landing {
  /**
   * Look up a landing by ID or slug.
   */
  landing: Landing_landing | null;
}

export interface LandingVariables {
  slug: string;
  collectionsFirst: number;
  productsFirst: number;
}
