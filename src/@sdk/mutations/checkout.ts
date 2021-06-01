import gql from "graphql-tag";

import { checkoutFragment } from "../fragments/checkout";
import { paymentFragment } from "../fragments/payment";
import { orderDetailFragment } from "../fragments/user";

export const checkoutErrorsFragment = gql`
  fragment CheckoutErrorsFragment on CheckoutError {
    field
    message
    code
    products {
      sku
      quantityAvailable
    }
  }
`

export const updateCheckoutLineMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
      checkoutErrors {
        field
        message
        code
        products {
          sku
          quantityAvailable
        }
      }
    }
  }
`;

export const createCheckoutMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorsFragment}
  mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors {
        field
        message
      }
      checkoutErrors {
        ...CheckoutErrorsFragment
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutBillingAddressWithEmailMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutBillingAddressWithEmail(
    $checkoutId: ID!
    $billingAddress: AddressInput!
    $email: String!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
    }
  }
`;

export const updateCheckoutBillingAddressMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutBillingAddress(
    $checkoutId: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorsFragment}
  mutation UpdateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $email: String!
    $documentNumber: String!
    $privacyPolicy: PrivacyPolicyInput!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
      checkoutErrors {
        ...CheckoutErrorsFragment
      }
    }
    checkoutEmailUpdate(
      checkoutId: $checkoutId
      email: $email
      documentNumber: $documentNumber
      privacyPolicy: $privacyPolicy
    ) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
    }
  }
`;


export const updateCheckoutShippingMethodMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorsFragment}
  mutation UpdateCheckoutShippingMethod(
    $checkoutId: ID!
    $shippingMethodId: ID!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutErrorsFragment
      }
    }
  }
`;

export const updateCheckoutShippingMethodMutationWithScheduleDate = gql`
  ${checkoutFragment}
  ${checkoutErrorsFragment}
  mutation UpdateCheckoutShippingMethodWithScheduleDate(
    $checkoutId: ID!
    $shippingMethodId: ID!
    $scheduleTimeId: ID!
    $date: Date!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
      scheduleDate: {
        scheduleTimeId: $scheduleTimeId
        date: $date
      }
    ) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutErrorsFragment
      }
    }
  }
`;

export const addCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation AddCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...Checkout
      }
      message 
      errors {
        field
        message
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation RemoveCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
`;

export const createCheckoutPaymentMutation = gql`
  ${checkoutFragment}
  ${paymentFragment}
  mutation CreateCheckoutPayment(
    $checkoutId: ID!
    $paymentInput: PaymentInput!
  ) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
      payment {
        ...Payment
      }
      paymentErrors {
        field
        message
        code
      }
    }
  }
`;

export const completeCheckoutMutation = gql`
  ${orderDetailFragment}
  ${checkoutErrorsFragment}
  mutation CompleteCheckout($checkoutId: ID!, $paymentData: JSONString) {
    checkoutComplete(checkoutId: $checkoutId, paymentData: $paymentData) {
      checkoutErrors {
        ...CheckoutErrorsFragment
      }
      order {
        ...OrderDetail
      }
    }
  }
`;
