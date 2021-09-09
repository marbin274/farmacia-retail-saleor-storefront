import gql from 'graphql-tag';

export const shippingMethodsQuery = gql`
  query GetShippingMethods($lines: [CheckoutLineInput]!, $district: ID) {
    potentialShippingMethods(lines: $lines, district: $district) {
      id
      maximumOrderPrice {
        amount
        currency
        culture
      }
      methodType {
        id
        code
        name
      }
      minimumOrderPrice {
        amount
        currency
        culture
      }
      name
      price {
        amount
        culture
        currency
      }
    }
  }
`;
