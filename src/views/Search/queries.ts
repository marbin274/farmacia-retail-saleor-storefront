import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { productPricingFragment, productVariantFragmentSimple } from "../Product/queries";
import {
  SearchProducts,
  SearchProductsVariables,
} from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  query SearchProducts(
    $query: String!
    $attributes: [AttributeInput]
    $pageSize: Int
    $page: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
    $districtId: ID
  ) {
    paginatedProducts(
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        minimalPrice: { gte: $priceGte, lte: $priceLte }
        search: $query
      }
    ) {
      totalCount
      edges {
        node {
          ...ProductPricingField
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
      }
    }
    attributes(first: 100) {
      edges {
        node {
          filterableInStorefront
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const TypedSearchProductsQuery = TypedQuery<
  SearchProducts,
  SearchProductsVariables
>(searchProductsQuery);
