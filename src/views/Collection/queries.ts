import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragmentSimple,
} from "../Product/queries";
import { Collection, CollectionVariables } from "./gqlTypes/Collection";
import { CollectionCategories, CollectionCategoriesVariables } from "./gqlTypes/CollectionCategories";

export const collectionProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  query Collection(
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
    collection(id: $id) {
      id
      slug
      name
      seoDescription
      seoTitle
      backgroundImage {
        url
      }
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

export const TypedCollectionProductsQuery = TypedQuery<
  Collection,
  CollectionVariables
>(collectionProductsQuery);

export const collectionCategoriesQuery = gql`
  query CollectionCategories(
    $id: ID!
  ) {   
    collection(id: $id) {
      id
      categories(first: 10) {
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

export const TypedCollectionCategoriesQuery = TypedQuery<
  CollectionCategories,
  CollectionCategoriesVariables
>(collectionCategoriesQuery);
