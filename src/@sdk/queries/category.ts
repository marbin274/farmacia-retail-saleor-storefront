import gql from 'graphql-tag';

export const categoryListQuery = gql`
  query CategoryList {
    root_categories(first: 100) {
      edges {
        node {
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
