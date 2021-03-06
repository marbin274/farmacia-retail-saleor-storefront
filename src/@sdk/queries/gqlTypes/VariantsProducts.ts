/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantsProducts
// ====================================================

export interface VariantsProducts_productVariants_edges_node_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface VariantsProducts_productVariants_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Product type
   */
  productType: VariantsProducts_productVariants_edges_node_product_productType | null;
}

export interface VariantsProducts_productVariants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  product: VariantsProducts_productVariants_edges_node_product;
}

export interface VariantsProducts_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantsProducts_productVariants_edges_node;
}

export interface VariantsProducts_productVariants {
  __typename: "ProductVariantCountableConnection";
  edges: VariantsProducts_productVariants_edges[];
}

export interface VariantsProducts {
  /**
   * List of product variants.
   */
  productVariants: VariantsProducts_productVariants | null;
}

export interface VariantsProductsVariables {
  ids?: (string | null)[] | null;
}
