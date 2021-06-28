import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragmentSimple,
} from "../Product/queries";
import { Collection, CollectionVariables } from "./gqlTypes/Collection";

export const collectionProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  query Collection(
    $id: ID!, 
    $attributes: [AttributeInput],
    $pageSize: Int, 
    $page: Int, 
    $sortBy: ProductOrder, 
    $priceLte: Float, 
    $priceGte: Float, 
    $districtId: ID
  ) {
    paginatedProducts(
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes, 
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
