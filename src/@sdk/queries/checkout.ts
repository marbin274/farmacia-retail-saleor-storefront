import gql from "graphql-tag";

import {
  checkoutFragment, checkoutPriceFragment,
} from "../fragments/checkout";

export const checkoutDetails = gql`
  ${checkoutFragment}
  query CheckoutDetails($token: UUID!, $districtId: ID) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const userCheckoutDetails = gql`
  ${checkoutFragment}
  query UserCheckoutDetails($districtId: ID) {
    me {
      id
      checkout {
        ...Checkout
      }
    }
  }
`;

export const checkoutProductVariants = gql`
  ${checkoutPriceFragment}
  query CheckoutProductVariants($ids: [ID], $districtId: ID) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          id
          name
          sku
          quantityAvailable(district: $districtId)
          isAvailable
          pricing {
            onSale
            priceUndiscounted {
              ...Price
            }
            price {
              ...Price
            }
          }
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
              value: name
            }
          }
          product {
            id
            name
            attributes {
              attribute {
                id
                name
              }
              values {
                id
                name
                value: name
              }
            }
            thumbnail {
              url
              alt
            }
            thumbnail2x: thumbnail(size: 510) {
              url
            }
            productType {
              isShippingRequired
            }
          }
        }
      }
    }
  }
`;
