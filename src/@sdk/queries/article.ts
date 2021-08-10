import gql from "graphql-tag";


export const articleDetail = gql`
  query ArticleDetail($slug: String!) {
    page(slug: $slug) {
      contentImage
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
    }
    shop {
      homepageCollection {
        id
        backgroundImage {
          url
        }
      }
    }
  }
`;

