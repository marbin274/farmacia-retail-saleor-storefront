/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SimpleCategory
// ====================================================

export interface SimpleCategory_ancestors_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleCategory_ancestors_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleCategory_ancestors_edges_node_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleCategory_ancestors_edges_node_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: SimpleCategory_ancestors_edges_node_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface SimpleCategory_ancestors_edges_node_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleCategory_ancestors_edges_node_children_edges_node_children_edges_node;
}

export interface SimpleCategory_ancestors_edges_node_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: SimpleCategory_ancestors_edges_node_children_edges_node_children_edges[];
}

export interface SimpleCategory_ancestors_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: SimpleCategory_ancestors_edges_node_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: SimpleCategory_ancestors_edges_node_children_edges_node_children | null;
}

export interface SimpleCategory_ancestors_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleCategory_ancestors_edges_node_children_edges_node;
}

export interface SimpleCategory_ancestors_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: SimpleCategory_ancestors_edges_node_children_edges[];
}

export interface SimpleCategory_ancestors_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: SimpleCategory_ancestors_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: SimpleCategory_ancestors_edges_node_children | null;
}

export interface SimpleCategory_ancestors_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleCategory_ancestors_edges_node;
}

export interface SimpleCategory_ancestors {
  __typename: "CategoryCountableConnection";
  edges: SimpleCategory_ancestors_edges[];
}

export interface SimpleCategory_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleCategory_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleCategory_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleCategory_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: SimpleCategory_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface SimpleCategory_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleCategory_children_edges_node_children_edges_node;
}

export interface SimpleCategory_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: SimpleCategory_children_edges_node_children_edges[];
}

export interface SimpleCategory_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: SimpleCategory_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: SimpleCategory_children_edges_node_children | null;
}

export interface SimpleCategory_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleCategory_children_edges_node;
}

export interface SimpleCategory_children {
  __typename: "CategoryCountableConnection";
  edges: SimpleCategory_children_edges[];
}

export interface SimpleCategory {
  __typename: "Category";
  /**
   * List of ancestors of the category.
   */
  ancestors: SimpleCategory_ancestors | null;
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: SimpleCategory_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: SimpleCategory_children | null;
}
