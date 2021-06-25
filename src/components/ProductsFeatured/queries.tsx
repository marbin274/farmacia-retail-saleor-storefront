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

const featuredProductFragment = gql`
${basicProductFragment}
${productPricingFragment}
fragment FeaturedProductFields on Product {
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
    quantityAvailable(district: $districtId)
  }
}
`;

export const featuredProducts = gql`
  ${featuredProductFragment}
  query FeaturedProducts(
    $first: Int!,
    $districtId: ID,
    $firstCollection: Int,
    $sortBy: CollectionSortingInput
  ) {
    shop {
      homepageCollections(first: $firstCollection, sortBy: $sortBy) {
        edges {
          node {
            id
            name
            products(district: $districtId, first: $first) {
              edges {
                node {
                  ...FeaturedProductFields
                }
              }
            }
          }
        }
      }
    }
    personalized: recommendedProducts(maxResults: $first) {
      ...FeaturedProductFields
    } 

  }
`;


export const TypedFeaturedProductsQuery = TypedQuery<
  FeaturedProducts,
  FeaturedProductsVariables
>(featuredProducts);
