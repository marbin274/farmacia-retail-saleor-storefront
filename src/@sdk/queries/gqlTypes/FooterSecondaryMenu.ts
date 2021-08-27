/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FooterSecondaryMenu
// ====================================================

export interface FooterSecondaryMenu_shop_navigation_secondary_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items_page {
  __typename: "Page";
  slug: string;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: FooterSecondaryMenu_shop_navigation_secondary_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: FooterSecondaryMenu_shop_navigation_secondary_items_children_collection | null;
  page: FooterSecondaryMenu_shop_navigation_secondary_items_children_page | null;
}

export interface FooterSecondaryMenu_shop_navigation_secondary_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: FooterSecondaryMenu_shop_navigation_secondary_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: FooterSecondaryMenu_shop_navigation_secondary_items_collection | null;
  page: FooterSecondaryMenu_shop_navigation_secondary_items_page | null;
  children: (FooterSecondaryMenu_shop_navigation_secondary_items_children | null)[] | null;
}

export interface FooterSecondaryMenu_shop_navigation_secondary {
  __typename: "Menu";
  items: (FooterSecondaryMenu_shop_navigation_secondary_items | null)[] | null;
}

export interface FooterSecondaryMenu_shop_navigation {
  __typename: "Navigation";
  /**
   * Secondary navigation bar.
   */
  secondary: FooterSecondaryMenu_shop_navigation_secondary | null;
}

export interface FooterSecondaryMenu_shop {
  __typename: "Shop";
  /**
   * Shop's navigation.
   */
  navigation: FooterSecondaryMenu_shop_navigation | null;
}

export interface FooterSecondaryMenu {
  /**
   * Return information about the shop.
   */
  shop: FooterSecondaryMenu_shop;
}
