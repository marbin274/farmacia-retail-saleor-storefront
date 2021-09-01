/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePage
// ====================================================

export interface HomePage_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface HomePage_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: HomePage_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface HomePage_shop_analyticsConfig {
  __typename: "AnalyticsConfiguration";
  /**
   * google tag manager id
   */
  tagManagerId: string | null;
  /**
   * google tag manager preview auth
   */
  tagManagerAuth: string | null;
  /**
   * google tag manager preview environment
   */
  tagManagerEnvironmentId: string | null;
}

export interface HomePage_shop {
  __typename: "Shop";
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: HomePage_shop_homepageCollection | null;
  /**
   * Web Analytics configuration
   */
  analyticsConfig: HomePage_shop_analyticsConfig | null;
}

export interface HomePage {
  /**
   * Return information about the shop.
   */
  shop: HomePage_shop;
}
