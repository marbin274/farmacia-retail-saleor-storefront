/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryList
// ====================================================

export interface CategoryList_categories_edges_node_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CategoryList_categories_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryList_categories_edges_node_children_edges_node;
}

export interface CategoryList_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: CategoryList_categories_edges_node_children_edges[];
}

export interface CategoryList_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of children of the category.
   */
  children: CategoryList_categories_edges_node_children | null;
}

export interface CategoryList_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryList_categories_edges_node;
}

export interface CategoryList_categories {
  __typename: "CategoryCountableConnection";
  edges: CategoryList_categories_edges[];
}

export interface CategoryList {
  /**
   * List of the shop's categories.
   */
  categories: CategoryList_categories | null;
}
