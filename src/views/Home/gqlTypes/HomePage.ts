/* tslint:disable */
/* eslint-disable */
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

export interface HomePage_mainBanner_frames_images {
  __typename: "BannerImage";
  /**
   * The screen type of the image
   */
  screenType: string;
  /**
   * The image's URL
   */
  url: string;
}

export interface HomePage_mainBanner_frames {
  __typename: "BannerFrame";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Frame action link
   */
  link: string | null;
  /**
   * Lis of banner images
   */
  images: (HomePage_mainBanner_frames_images | null)[] | null;
}

export interface HomePage_mainBanner {
  __typename: "Banner";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The frames containing images for each screen
   */
  frames: (HomePage_mainBanner_frames | null)[] | null;
}

export interface HomePage {
  /**
   * Return information about the shop.
   */
  shop: HomePage_shop;
  /**
   * Look up the Banner that must appear in the home page
   */
  mainBanner: HomePage_mainBanner | null;
}
