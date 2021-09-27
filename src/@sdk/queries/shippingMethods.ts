import gql from 'graphql-tag';

export const potentialShippingMethods = gql`
  query GetPotentialShippingMethods(
    $lines: [CheckoutLineInput]!
    $district: ID
  ) {
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
      scheduleDates {
        date
        scheduleTimes {
          id
          startTime
          endTime
        }
      }
      subtitle
    }
  }
`;

export const potentialSlots = gql`
  query GetPotentialSlots(
    $lines: [CheckoutLineInput]!
    $shippingAddress: AddressInput!
    $sessionId: UUID!
  ) {
    potentialSlots(
      lines: $lines
      shippingAddress: $shippingAddress
      sessionId: $sessionId
    ) {
      scheduled {
        id
        slotFrom
        slotTo
      }
      express {
        id
        slotFrom
        slotTo
      }
      express30 {
        id
        slotFrom
        slotTo
      }
      nextDay {
        id
        slotFrom
        slotTo
      }
      datetime
    }
  }
`;
