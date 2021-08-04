/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FavoriteCategoryInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SaveFavoriteCategories
// ====================================================

export interface SaveFavoriteCategories_accountSetFavoriteCategories_user {
  __typename: "User";
  /**
   * List of favorite categories ID.
   */
  favoriteCategories: (string | null)[] | null;
}

export interface SaveFavoriteCategories_accountSetFavoriteCategories_accountErrors {
  __typename: "AccountError";
  /**
   * The error message.
   */
  message: string | null;
}

export interface SaveFavoriteCategories_accountSetFavoriteCategories {
  __typename: "AccountSetFavoriteCategories";
  /**
   * A user with favorite categories.
   */
  user: SaveFavoriteCategories_accountSetFavoriteCategories_user | null;
  accountErrors: SaveFavoriteCategories_accountSetFavoriteCategories_accountErrors[];
}

export interface SaveFavoriteCategories {
  /**
   * Link or unlink categories to an authenticated user.
   */
  accountSetFavoriteCategories: SaveFavoriteCategories_accountSetFavoriteCategories | null;
}

export interface SaveFavoriteCategoriesVariables {
  categories: (FavoriteCategoryInput | null)[];
}
