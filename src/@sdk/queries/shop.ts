import gql from 'graphql-tag';

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

export const homePage = gql`
  query HomePage {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
      }
      analyticsConfig {
        tagManagerId
        tagManagerAuth
        tagManagerEnvironmentId
      }
    }
  }
`;
