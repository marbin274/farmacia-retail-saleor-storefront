import gql from "graphql-tag";

import {basicProductFragment, productPricingFragment} from "@temp/views/Product/queries";
import { TypedQuery } from "../../core/queries";
import { HomePage, HomePageVariables } from "./gqlTypes/HomePage";


// get shop, category by id, products from that category
export const homePageQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
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
