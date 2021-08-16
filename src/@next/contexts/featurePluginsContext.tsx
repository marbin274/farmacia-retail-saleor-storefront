import React, { createContext, FC } from "react";
import { GetShopFeaturePlugins_shop_availableFeaturePlugins } from "@sdk/queries/gqlTypes/GetShopFeaturePlugins";
import { useFeaturePlugins as useGetFeaturePlugins } from "@sdk/react";

type IFeaturePluginsContextState = {
  plugins: GetShopFeaturePlugins_shop_availableFeaturePlugins[];
};

export const FeaturePluginsContext = createContext<IFeaturePluginsContextState>(
  { plugins: [] }
);

export const FeaturedPluginsProvider: FC = ({ children }) => {
  const { data } = useGetFeaturePlugins({ fetchPolicy: "network-only" });

  return (
    <FeaturePluginsContext.Provider value={{ plugins: data || [] }}>
      {children}
    </FeaturePluginsContext.Provider>
  );
};
