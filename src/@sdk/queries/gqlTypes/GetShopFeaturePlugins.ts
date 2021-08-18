/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShopFeaturePlugins
// ====================================================

export interface GetShopFeaturePlugins_shop_availableFeaturePlugins {
  __typename: "FeaturePlugin";
  /**
   * Plugin ID.
   */
  id: string;
  /**
   * Plugin name.
   */
  name: string;
  /**
   * Plugin is active.
   */
  active: boolean;
}

export interface GetShopFeaturePlugins_shop {
  __typename: "Shop";
  /**
   * Plugins available for storefront.
   */
  availableFeaturePlugins: (GetShopFeaturePlugins_shop_availableFeaturePlugins | null)[] | null;
}

export interface GetShopFeaturePlugins {
  /**
   * Return information about the shop.
   */
  shop: GetShopFeaturePlugins_shop;
}
