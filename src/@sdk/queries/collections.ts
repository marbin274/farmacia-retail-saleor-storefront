import gql from "graphql-tag";
import { basicProductFragment, productPricingFragment, productVariantFragmentSimple } from "../fragments/products";

export const collectionList = gql`
${basicProductFragment}
${productPricingFragment}
${productVariantFragmentSimple}
query CollectionList(
  $id: ID!, 
  $attributes: [AttributeInput],
  $categories: [ID],
  $districtId: ID,
  $page: Int, 
  $pageSize: Int, 
  $priceGte: Float, 
  $priceLte: Float, 
  $sortBy: ProductOrder, 
) {
  paginatedProducts(
    page: $page
    pageSize: $pageSize
    sortBy: $sortBy
    filter: {
      attributes: $attributes, 
      categories: $categories,
      collections: [$id], 
      minimalPrice: {
        gte: $priceGte, 
        lte: $priceLte
      }
    }
  ) {
    totalCount
    edges {
      node {
        ...BasicProductFields
        ...ProductPricingField
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
        variants {
          ...ProductVariantFieldsSimple
        }
      }
    }
  }
}
`;

export const collectionCategories = gql`
  query CollectionCategories(
    $id: ID!
  ) {   
    collection(id: $id) {
      id
      backgroundImage {
        url
      }
      categories(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
      slug
      name
      seoDescription
      seoTitle 
    }
    attributes(filter: {inCollection: $id}, first: 100) {
      edges {
        node {
          id
          name
          slug
          filterableInStorefront
          values(collection: $id) {
            id
            name
            slug
          }
        }
      }
    }  
  }
`;

