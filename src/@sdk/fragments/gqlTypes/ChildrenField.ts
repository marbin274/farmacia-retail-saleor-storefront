/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChildrenField
// ====================================================

export interface ChildrenField_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ChildrenField_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ChildrenField_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ChildrenField_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: ChildrenField_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface ChildrenField_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ChildrenField_children_edges_node_children_edges_node;
}

export interface ChildrenField_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: ChildrenField_children_edges_node_children_edges[];
}

export interface ChildrenField_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: ChildrenField_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: ChildrenField_children_edges_node_children | null;
}

export interface ChildrenField_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ChildrenField_children_edges_node;
}

export interface ChildrenField_children {
  __typename: "CategoryCountableConnection";
  edges: ChildrenField_children_edges[];
}

export interface ChildrenField {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: ChildrenField_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: ChildrenField_children | null;
}
