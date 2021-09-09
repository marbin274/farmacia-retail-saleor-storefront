import gql from 'graphql-tag';
import { priceFragment } from '../fragments/products';

export const searchResultsQuery = gql`
  ${priceFragment}
  query SearchResults($query: String!, $districtId: ID) {
    products(
      filter: { search: $query }
      first: 100
      sortBy: { field: STOCK_AVAILABLE, direction: DESC }
    ) {
      edges {
        node {
          id
          name
          isAvailable
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
          }
          url
          variants {
            id
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
          pricing {
            priceRange {
              start {
                net {
                  amount
                  currency
                  culture
                }
              }
              stop {
                net {
                  amount
                  currency
                  culture
                }
              }
            }
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
