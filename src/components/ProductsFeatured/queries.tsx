import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../../views/Product/queries";
import { FeaturedProducts, FeaturedVariables } from "./gqlTypes/FeaturedProducts";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query FeaturedProducts ($first: Int)  {
    shop {
      homepageCollection {
        id
        name
        products(first: $first) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              category {
                id
                name
              }
              variants {
                id
                quantityAvailable
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<FeaturedProducts, FeaturedVariables>(featuredProducts);
