import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragmentSimple,
} from "../Product/queries";
import { Category, CategoryVariables } from "./gqlTypes/Category";

export const basicFieldCategory = gql`
  fragment BasicFieldCategory on Category {
    seoDescription
    seoTitle
    id
    name
    backgroundImage {
      url
    }
  }
`;

export const childrenField = gql`
  ${basicFieldCategory}
  fragment ChildrenField on Category{
    ...BasicFieldCategory
    children(first: 100){
      edges{
        node{
          ...BasicFieldCategory
          children(first: 100){
            edges{
              node{
                ...BasicFieldCategory
              }
            }
          }
        }
      }
    }
  }
`;

export const simpleCategory = gql`  
  ${childrenField}
  fragment SimpleCategory on Category {       
    ancestors(first: 2) {
      edges {
        node {
          ...ChildrenField
        }
      }
    }
  ...ChildrenField 
  }
`;

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  ${simpleCategory}

  query Category(
    $id: ID!
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
          values(category:$id) {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const TypedCategoryProductsQuery = TypedQuery<
  Category,
  CategoryVariables
>(categoryProductsQuery);
