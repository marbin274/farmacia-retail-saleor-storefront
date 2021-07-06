/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Banner
// ====================================================

export interface Banner_mainBanner_frames_images {
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

export interface Banner_mainBanner_frames {
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
  images: (Banner_mainBanner_frames_images | null)[] | null;
}

export interface Banner_mainBanner {
  __typename: "Banner";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The frames containing images for each screen
   */
  frames: (Banner_mainBanner_frames | null)[] | null;
}

export interface Banner {
  /**
   * Look up the Banner that must appear in the home page
   */
  mainBanner: Banner_mainBanner | null;
}
