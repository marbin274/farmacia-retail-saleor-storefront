import gql from "graphql-tag";
import { basicProductFragment, productPricingFragment } from "../fragments/products";

export const landing = gql`
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
