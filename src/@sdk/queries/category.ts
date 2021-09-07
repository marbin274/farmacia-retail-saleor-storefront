import gql from 'graphql-tag';
import { simpleCategory } from '../fragments/category';
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragmentSimple,
} from '../fragments/products';

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
  ${simpleCategory}
  query CategoryDetails($id: ID!) {
    category(id: $id) {
      ...SimpleCategory
    }
    attributes(filter: { inCategory: $id }, first: 100) {
      edges {
        node {
          id
          name
          slug
          filterableInStorefront
          values(category: $id) {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const categoryProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  query CategoryProducts(
    $id: ID!
    $attributes: [AttributeInput]
    $districtId: ID
    $page: Int
    $pageSize: Int
    $priceGte: Float
    $priceLte: Float
    $sortBy: ProductOrder
  ) {
    paginatedProducts(
      page: $page
      pageSize: $pageSize
      district: $districtId
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
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
