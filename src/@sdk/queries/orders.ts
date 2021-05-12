import gql from "graphql-tag";

export const ordersByUser = gql`
  query OrdersByUser($perPage: Int!, $after: String) {
    me {
      id
      orders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            token
            sequentialCode
            number
            status
            statusDisplay
            customerStatusDisplay
            created
            total {
              gross {
                amount
                currency
                culture
              }
              net {
                amount
                currency
                culture
              }
            }
            lines {
              id
              productName
              variant {
                id
                productId
              }
              thumbnail {
                alt
                url
              }
              thumbnail2x: thumbnail(size: 510) {
                url
              }
            }
          }
        }
      }
    }
  }
`;
