/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicFieldCategory
// ====================================================

export interface BasicFieldCategory_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface BasicFieldCategory {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: BasicFieldCategory_backgroundImage | null;
}
