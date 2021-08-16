/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryDetails
// ====================================================

export interface CategoryDetails_category_ancestors_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_ancestors_edges_node_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_ancestors_edges_node_children_edges_node_children_edges_node;
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_ancestors_edges_node_children_edges_node_children_edges[];
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_ancestors_edges_node_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: CategoryDetails_category_ancestors_edges_node_children_edges_node_children | null;
}

export interface CategoryDetails_category_ancestors_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_ancestors_edges_node_children_edges_node;
}

export interface CategoryDetails_category_ancestors_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_ancestors_edges_node_children_edges[];
}

export interface CategoryDetails_category_ancestors_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_ancestors_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: CategoryDetails_category_ancestors_edges_node_children | null;
}

export interface CategoryDetails_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_ancestors_edges_node;
}

export interface CategoryDetails_category_ancestors {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_ancestors_edges[];
}

export interface CategoryDetails_category_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface CategoryDetails_category_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_children_edges_node_children_edges_node;
}

export interface CategoryDetails_category_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_children_edges_node_children_edges[];
}

export interface CategoryDetails_category_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: CategoryDetails_category_children_edges_node_children | null;
}

export interface CategoryDetails_category_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_children_edges_node;
}

export interface CategoryDetails_category_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_children_edges[];
}

export interface CategoryDetails_category {
  __typename: "Category";
  /**
   * List of ancestors of the category.
   */
  ancestors: CategoryDetails_category_ancestors | null;
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: CategoryDetails_category_children | null;
}

export interface CategoryDetails_attributes_edges_node_values {
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

export interface CategoryDetails_attributes_edges_node {
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
  values: (CategoryDetails_attributes_edges_node_values | null)[] | null;
}

export interface CategoryDetails_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_attributes_edges_node;
}

export interface CategoryDetails_attributes {
  __typename: "AttributeCountableConnection";
  edges: CategoryDetails_attributes_edges[];
}

export interface CategoryDetails {
  /**
   * Look up a category by ID or slug.
   */
  category: CategoryDetails_category | null;
  /**
   * List of the shop's attributes.
   */
  attributes: CategoryDetails_attributes | null;
}

export interface CategoryDetailsVariables {
  id: string;
}
