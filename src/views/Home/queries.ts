import gql from "graphql-tag";

import {
  basicProductFragment,
  priceFragment,
  productPricingFragment,
} from "@temp/views/Product/queries";
import { TypedQuery } from "../../core/queries";
import { HomePage, HomePageVariables } from "./gqlTypes/HomePage";

export const productVariantFragmentSimple = gql`
    ${priceFragment}
    fragment ProductVariantFieldsSimple on ProductVariant {
        id
        sku
        name
        quantityAvailable
        images {
            id
            url
            alt
        }
        pricing {
            onSale
            priceUndiscounted {
                ...Price
            }
            price {
                ...Price
            }
        }
    }
`;


// get all available products according the specified filter
export const homePageQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  
  query HomePage(
    $pageSize: Int
    $sortBy: ProductOrder
  ) {
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
    }

    products(
      first: $pageSize
      sortBy: $sortBy
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          category {
            id
            name
          }
          variants {
            ...ProductVariantFieldsSimple
          }

        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;


export const TypedHomePageQuery = TypedQuery<HomePage, HomePageVariables>(homePageQuery);
