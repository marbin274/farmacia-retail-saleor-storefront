import gql from 'graphql-tag';

export const shippingMethodsQuery = gql`
  query GetShippingMethods($lines: [CheckoutLineInput]!) {
    potentialShippingMethods(lines: $lines) {
      id
      isScheduled
      maximumOrderPrice {
        amount
        currency
        culture
      }
      methodType {
        code
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
