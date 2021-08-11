/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionCategories
// ====================================================

export interface CollectionCategories_collection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

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
  backgroundImage: CollectionCategories_collection_backgroundImage | null;
  /**
   * List of product's categories in this collection.
   */
  categories: CollectionCategories_collection_categories | null;
  slug: string;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface CollectionCategories_attributes_edges_node_values {
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

export interface CollectionCategories_attributes_edges_node {
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
  values: (CollectionCategories_attributes_edges_node_values | null)[] | null;
}

export interface CollectionCategories_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionCategories_attributes_edges_node;
}

export interface CollectionCategories_attributes {
  __typename: "AttributeCountableConnection";
  edges: CollectionCategories_attributes_edges[];
}

export interface CollectionCategories {
  /**
   * Look up a collection by ID.
   */
  collection: CollectionCategories_collection | null;
  /**
   * List of the shop's attributes.
   */
  attributes: CollectionCategories_attributes | null;
}

export interface CollectionCategoriesVariables {
  id: string;
}
