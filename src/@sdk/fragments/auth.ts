import gql from "graphql-tag";

import { checkoutAddressFragment } from "./checkout";

export const userFragment = gql`
  ${checkoutAddressFragment}
  fragment User on User {
    id
    email
    favoriteCategories
    firstName
    lastName
    isStaff
    termsAndConditions
    dataTreatmentPolicy
    documentNumber
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
    cardTokens {
      binNumber
      brand
      cardNumber
      default
      email
      firstName
      id
      lastName
    }
  }
`;
