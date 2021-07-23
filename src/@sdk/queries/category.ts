import gql from "graphql-tag";

export const categoryListQuery = gql`
  query CategoryList {
    categories (first: 100, level: 0) {
      edges{
        node{
          id
          name
          children(last: 100) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const categoryQuery = gql`
  query CategoryDetails($id: ID!) {
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 100) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
