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
          polygon
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

export const footerSecondaryMenu = gql`
  fragment FooterSecondaryMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
  }

  query FooterSecondaryMenu {
    shop {
      navigation {
        secondary {
          items {
            ...FooterSecondaryMenuSubItem
            children {
              ...FooterSecondaryMenuSubItem
            }
          }
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
