/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MainMenuSubItem
// ====================================================

export interface MainMenuSubItem_category_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MainMenuSubItem_category_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MainMenuSubItem_category_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MainMenuSubItem_category_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MainMenuSubItem_category_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface MainMenuSubItem_category_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MainMenuSubItem_category_children_edges_node_children_edges_node;
}

export interface MainMenuSubItem_category_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: MainMenuSubItem_category_children_edges_node_children_edges[];
}

export interface MainMenuSubItem_category_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MainMenuSubItem_category_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: MainMenuSubItem_category_children_edges_node_children | null;
}

export interface MainMenuSubItem_category_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MainMenuSubItem_category_children_edges_node;
}

export interface MainMenuSubItem_category_children {
  __typename: "CategoryCountableConnection";
  edges: MainMenuSubItem_category_children_edges[];
}

export interface MainMenuSubItem_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MainMenuSubItem_category_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: MainMenuSubItem_category_children | null;
}

export interface MainMenuSubItem_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenuSubItem_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenuSubItem_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MainMenuSubItem {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * URL to the menu item.
   */
  url: string | null;
  category: MainMenuSubItem_category | null;
  collection: MainMenuSubItem_collection | null;
  page: MainMenuSubItem_page | null;
  parent: MainMenuSubItem_parent | null;
}
