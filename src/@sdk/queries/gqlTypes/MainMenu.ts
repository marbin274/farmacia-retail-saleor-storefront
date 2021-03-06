/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainMenu
// ====================================================

export interface MainMenu_root_categories_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MainMenu_root_categories_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MainMenu_root_categories_edges_node_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MainMenu_root_categories_edges_node_children_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MainMenu_root_categories_edges_node_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface MainMenu_root_categories_edges_node_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MainMenu_root_categories_edges_node_children_edges_node_children_edges_node;
}

export interface MainMenu_root_categories_edges_node_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: MainMenu_root_categories_edges_node_children_edges_node_children_edges[];
}

export interface MainMenu_root_categories_edges_node_children_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MainMenu_root_categories_edges_node_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: MainMenu_root_categories_edges_node_children_edges_node_children | null;
}

export interface MainMenu_root_categories_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MainMenu_root_categories_edges_node_children_edges_node;
}

export interface MainMenu_root_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: MainMenu_root_categories_edges_node_children_edges[];
}

export interface MainMenu_root_categories_edges_node {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MainMenu_root_categories_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: MainMenu_root_categories_edges_node_children | null;
}

export interface MainMenu_root_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: MainMenu_root_categories_edges_node;
}

export interface MainMenu_root_categories {
  __typename: "CategoryCountableConnection";
  edges: MainMenu_root_categories_edges[];
}

export interface MainMenu_shop_navigation_main_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_shop_navigation_main_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_shop_navigation_main_items_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenu_shop_navigation_main_items_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MainMenu_shop_navigation_main_items {
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
  category: MainMenu_shop_navigation_main_items_category | null;
  collection: MainMenu_shop_navigation_main_items_collection | null;
  page: MainMenu_shop_navigation_main_items_page | null;
  parent: MainMenu_shop_navigation_main_items_parent | null;
}

export interface MainMenu_shop_navigation_main {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  items: (MainMenu_shop_navigation_main_items | null)[] | null;
}

export interface MainMenu_shop_navigation {
  __typename: "Navigation";
  /**
   * Main navigation bar.
   */
  main: MainMenu_shop_navigation_main | null;
}

export interface MainMenu_shop {
  __typename: "Shop";
  /**
   * Shop's navigation.
   */
  navigation: MainMenu_shop_navigation | null;
}

export interface MainMenu {
  /**
   * List of categories with level 0.
   */
  root_categories: MainMenu_root_categories | null;
  /**
   * Return information about the shop.
   */
  shop: MainMenu_shop;
}
