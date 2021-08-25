import gql from 'graphql-tag';

import {
  basicProductFragment,
  productPricingFragment,
  productVariantFragment,
  productVariantFragmentSimple,
  selectedAttributeFragment,
} from '../fragments/products';

export const productList = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query ProductList(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
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
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const productDetails = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails($id: ID!, $countryCode: CountryCode, $districtId: ID) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      category {
        id
        name
        products(first: 3) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
            }
          }
        }
      }
      images {
        id
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
      isAvailable
    }
  }
`;

export const variantsProducts = gql`
  query VariantsProducts($ids: [ID]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          id
          product {
            id
            productType {
              isShippingRequired
            }
          }
        }
      }
    }
  }
`;

export const variantsProductsAvailable = gql`
  query VariantsProductsAvailable($ids: [ID], $districtId: ID) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          id
          isAvailable
          quantityAvailable(district: $districtId)
        }
      }
    }
  }
`;

export const searchProducts = gql`
  ${productPricingFragment}
  ${productVariantFragmentSimple}
  query SearchProducts(
    $query: String!
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
        minimalPrice: { gte: $priceGte, lte: $priceLte }
        search: $query
      }
    ) {
      totalCount
      edges {
        node {
          ...ProductPricingField
          id
          name
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
              value: name
            }
          }
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    attributes(first: 100) {
      edges {
        node {
          filterableInStorefront
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
  }
`;

const featuredProductFragment = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  fragment FeaturedProductFields on Product {
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
      id
      sku
      pricing {
        onSale
        price {
          ...Price
        }
        priceUndiscounted {
          ...Price
        }
      }
      quantityAvailable(district: $districtId)
    }
  }
`;

export const featuredProducts = gql`
  ${featuredProductFragment}
  query FeaturedProducts(
    $first: Int!
    $firstPersonalize: Int!
    $districtId: ID
    $firstCollection: Int
    $sortBy: CollectionSortingInput
  ) {
    shop {
      homepageCollections(first: $firstCollection, sortBy: $sortBy) {
        edges {
          node {
            id
            name
            products(district: $districtId, first: $first) {
              edges {
                node {
                  ...FeaturedProductFields
                }
              }
            }
          }
        }
      }
    }
    personalized: recommendedProducts(
      maxResults: $firstPersonalize
      district: $districtId
    ) {
      ...FeaturedProductFields
    }
  }
`;

export const selledProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query SelledProducts(
    $districtId: ID
    $period: ReportingPeriod!
    $first: Int
  ) {
    reportProductSales(district: $districtId, period: $period, first: $first) {
      edges {
        node {
          id
          attributes {
            values {
              id
              name
              __typename
            }
            __typename
          }
          product {
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
              id
              sku
              pricing {
                onSale
                price {
                  ...Price
                }
                priceUndiscounted {
                  ...Price
                }
              }
              quantityAvailable(district: $districtId)
            }
          }
          quantityOrdered
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
