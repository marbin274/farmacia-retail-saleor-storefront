import {
  basicProductFragment,
  productPricingFragment,
} from "@temp/views/Product/queries";
import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { Landing, LandingVariables } from "./gqlTypes/Landing";

export const landingQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Landing($slug: String!, $collectionsFirst: Int!, $productsFirst: Int!) {
    landing(slug: $slug) {
      title
      banner {
        id
        frames {
          id
          link
          images {
            screenType
            url
          }
        }
      }
      collections(first: $collectionsFirst) {
        edges {
          node {
            id
            name
            products(first: $productsFirst) {
              edges {
                node {
                  ...BasicProductFields
                  ...ProductPricingField
                  attributes {
                    attribute {
                      id
                      name
                    }
                    values {
                      id
                      name
                    }
                  }
                  category {
                    id
                    name
                  }
                  variants {
                    id
                    sku
                    quantityAvailable
                    pricing {
                      onSale
                      price {
                        ...Price
                      }
                      priceUndiscounted {
                        ...Price
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedLandingQuery = TypedQuery<Landing, LandingVariables>(
  landingQuery
);
