/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FooterSecondaryMenuSubItem
// ====================================================

export interface FooterSecondaryMenuSubItem_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FooterSecondaryMenuSubItem_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FooterSecondaryMenuSubItem_page {
  __typename: "Page";
  slug: string;
}

export interface FooterSecondaryMenuSubItem {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: FooterSecondaryMenuSubItem_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: FooterSecondaryMenuSubItem_collection | null;
  page: FooterSecondaryMenuSubItem_page | null;
}
