/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantsProductsAvailable
// ====================================================

export interface VariantsProductsAvailable_productVariants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
}

export interface VariantsProductsAvailable_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantsProductsAvailable_productVariants_edges_node;
}

export interface VariantsProductsAvailable_productVariants {
  __typename: "ProductVariantCountableConnection";
  edges: VariantsProductsAvailable_productVariants_edges[];
}

export interface VariantsProductsAvailable {
  /**
   * List of product variants.
   */
  productVariants: VariantsProductsAvailable_productVariants | null;
}

export interface VariantsProductsAvailableVariables {
  ids?: (string | null)[] | null;
  districtId?: string | null;
}
