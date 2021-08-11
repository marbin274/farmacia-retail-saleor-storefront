import React, { createContext, FC } from "react";
import { TypedShopFeaturePluginsQuery } from "@temp/@sdk/queries/shop";
import { GetShopFeaturePlugins_shop_availableFeaturePlugins } from "@temp/@sdk/queries/gqlTypes/GetShopFeaturePlugins";

type IFeaturePluginsContextState = {
  plugins: GetShopFeaturePlugins_shop_availableFeaturePlugins[];
};

export const FeaturePluginsContext = createContext<IFeaturePluginsContextState>(
  { plugins: [] }
);

export const FeaturedPluginsProvider: FC = ({ children }) => {
  return (
    <TypedShopFeaturePluginsQuery>
      {({ data }) => (
        <FeaturePluginsContext.Provider
          value={{ plugins: data?.shop?.availableFeaturePlugins || [] }}
        >
          {children}
        </FeaturePluginsContext.Provider>
      )}
    </TypedShopFeaturePluginsQuery>
  );
};
