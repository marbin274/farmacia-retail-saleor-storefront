/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MenuCategoryBasicFieldCategory
// ====================================================

export interface MenuCategoryBasicFieldCategory_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface MenuCategoryBasicFieldCategory {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: MenuCategoryBasicFieldCategory_backgroundImage | null;
}
