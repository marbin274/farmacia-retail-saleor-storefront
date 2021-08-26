import gql from 'graphql-tag';

export const mainBanner = gql`
  query MainBanner {
    mainBanner {
      id
      frames {
        id
        link
        images {
          screenType
          url
        }
      }
    }
  }
`;
