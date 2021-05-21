import gql from "graphql-tag";

export const getShop = gql`
  query GetShop {
    shop {
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
      availableDistricts {
        id
        name
        isDefault
      }
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
