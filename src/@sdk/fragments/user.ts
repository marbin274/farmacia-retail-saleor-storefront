import gql from "graphql-tag";

import {
  checkoutAddressFragment,
  checkoutProductVariantFragment,
} from "./checkout";

export const orderPriceFragment = gql`
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
      culture
    }
    net {
      amount
      currency
      culture
    }
  }
`;

export const orderDetailFragment = gql`
  ${orderPriceFragment}
  ${checkoutAddressFragment}
  ${checkoutProductVariantFragment}
  fragment OrderDetail on Order {
    userEmail
    paymentStatus
    paymentStatusDisplay
    shippingStatus
    customerStatusDisplay
    status
    statusDisplay
    id
    token
    number
    sequentialCode
    shippingAddress {
      ...Address
    }
    lines {
      productName
      quantity
      variant {
        ...ProductVariant
      }
      unitPrice {
        currency
        ...OrderPrice
      }
    }
    subtotal {
      ...OrderPrice
    }
    total {
      ...OrderPrice
    }
    shippingPrice {
      ...OrderPrice
    }
    sequentialCode
  }
`;
