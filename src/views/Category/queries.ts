import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragmentSimple,
} from "../Product/queries";
import { Category, CategoryVariables } from "./gqlTypes/Category";

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragmentSimple}

  fragment MainMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
    parent {
      id
    }
  }

  query Category(
    $id: ID!
    $attributes: [AttributeInput]
    $pageSize: Int
    $page: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
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
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    attributes(filter: { inCategory: $id }, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
    shop {
      navigation {
        main {
          id
          items {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
              children {
                ...MainMenuSubItem
              }
            }
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
