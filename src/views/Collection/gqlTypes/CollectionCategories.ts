/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionCategories
// ====================================================

export interface CollectionCategories_collection_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionCategories_collection_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionCategories_collection_categories_edges_node;
}

export interface CollectionCategories_collection_categories {
  __typename: "CategoryCountableConnection";
  edges: CollectionCategories_collection_categories_edges[];
}

export interface CollectionCategories_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of product's categories in this collection.
   */
  categories: CollectionCategories_collection_categories | null;
}

export interface CollectionCategories {
  /**
   * Look up a collection by ID.
   */
  collection: CollectionCategories_collection | null;
}

export interface CollectionCategoriesVariables {
  id: string;
}
