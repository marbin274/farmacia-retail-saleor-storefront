/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MenuCategoryChildrenField
// ====================================================

export interface MenuCategoryChildrenField_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MenuCategoryChildrenField_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MenuCategoryChildrenField_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MenuCategoryChildrenField_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MenuCategoryChildrenField_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface MenuCategoryChildrenField_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MenuCategoryChildrenField_children_edges_node_children_edges_node;
}

export interface MenuCategoryChildrenField_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: MenuCategoryChildrenField_children_edges_node_children_edges[];
}

export interface MenuCategoryChildrenField_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MenuCategoryChildrenField_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: MenuCategoryChildrenField_children_edges_node_children | null;
}

export interface MenuCategoryChildrenField_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MenuCategoryChildrenField_children_edges_node;
}

export interface MenuCategoryChildrenField_children {
  __typename: "CategoryCountableConnection";
  edges: MenuCategoryChildrenField_children_edges[];
}

export interface MenuCategoryChildrenField {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MenuCategoryChildrenField_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: MenuCategoryChildrenField_children | null;
}
