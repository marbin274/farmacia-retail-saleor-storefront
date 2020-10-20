import gql from "graphql-tag";

import {
  basicProductFragment,
  priceFragment,
  productPricingFragment,
  // productVariantFragment
} from "@temp/views/Product/queries";
import { TypedQuery } from "../../core/queries";
import { HomePage, HomePageVariables } from "./gqlTypes/HomePage";

// using little bit simplified version of productVariantFragment
export const productVariantFragmentSimple = gql`
    ${priceFragment}
    fragment ProductVariantFieldsSimple on ProductVariant {
        id
        sku
        name
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


// get shop, category by id, products from that category
export const homePageQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  
  query HomePage(
    $categoryId: ID!
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
      filter: {
        categories: [$categoryId]
      }
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
    
    category(id: $categoryId) {
      id
      name
    }
  }
`;


export const TypedHomePageQuery = TypedQuery<HomePage, HomePageVariables>(homePageQuery);
