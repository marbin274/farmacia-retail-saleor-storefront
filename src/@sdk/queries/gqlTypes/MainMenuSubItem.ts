/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MainMenuSubItem
// ====================================================

export interface MainMenuSubItem_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
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
