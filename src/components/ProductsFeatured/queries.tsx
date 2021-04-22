import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "@temp/views/Product/queries";
import {
  FeaturedProducts,
  FeaturedProductsVariables,
} from "./gqlTypes/FeaturedProducts";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query FeaturedProducts($first: Int) {
    shop {
      homepageCollections {
        id
        name
        products(first: $first) {
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
                pricing {
                  onSale
                  price {
                    ...Price
                  }
                  priceUndiscounted {
                    ...Price
                  }
                }
                quantityAvailable
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<
  FeaturedProducts,
  FeaturedProductsVariables
>(featuredProducts);
