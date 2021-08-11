/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainBanner
// ====================================================

export interface MainBanner_mainBanner_frames_images {
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

export interface MainBanner_mainBanner_frames {
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
  images: (MainBanner_mainBanner_frames_images | null)[] | null;
}

export interface MainBanner_mainBanner {
  __typename: "Banner";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The frames containing images for each screen
   */
  frames: (MainBanner_mainBanner_frames | null)[] | null;
}

export interface MainBanner {
  /**
   * Look up the Banner that must appear in the home page
   */
  mainBanner: MainBanner_mainBanner | null;
}
