/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticleDetail
// ====================================================

export interface ArticleDetail_page {
  __typename: "Page";
  contentImage: string | null;
  contentJson: any;
  /**
   * The ID of the object.
   */
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
}

export interface ArticleDetail_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ArticleDetail_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: ArticleDetail_shop_homepageCollection_backgroundImage | null;
}

export interface ArticleDetail_shop {
  __typename: "Shop";
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: ArticleDetail_shop_homepageCollection | null;
}

export interface ArticleDetail {
  /**
   * Look up a page by ID or slug.
   */
  page: ArticleDetail_page | null;
  /**
   * Return information about the shop.
   */
  shop: ArticleDetail_shop;
}

export interface ArticleDetailVariables {
  slug: string;
}
