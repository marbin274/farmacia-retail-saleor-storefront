import gql from "graphql-tag";
import { TypedQuery } from "@temp/core/queries";
import { GetShopFeaturePlugins } from "./gqlTypes/GetShopFeaturePlugins";

export const getShop = gql`
  query GetShop {
    shop {
      availableDistricts {
        id
        isActive
        isDefault
        name
        warehouse {
          id
          name
        }
      }
      displayGrossPrices
      defaultCountry {
        code
        country
      }
      countries {
        country
        code
      }
      geolocalization {
        country {
          code
          country
        }
      }
      isShippingAvailable
    }
  }
`;

export const getShopPaymentGateways = gql`
  query GetShopPaymentGateways {
    shop {
      availablePaymentGateways {
        id
        name
        config {
          field
          value
        }
      }
    }
  }
`;

export const getShopFeaturePlugins = gql`
  query GetShopFeaturePlugins {
    shop {
      availableFeaturePlugins {
        id
        name
        active
      }
    }
  }
`;

export const TypedShopFeaturePluginsQuery = TypedQuery<
  GetShopFeaturePlugins,
  {}
>(getShopFeaturePlugins);
