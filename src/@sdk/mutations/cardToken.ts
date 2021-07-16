import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";

export const setDefaultUserCardToken = gql`
  ${userFragment}
  mutation SetDefaultUserCardToken($id: ID!) {
    accountSetDefaultCardToken(id: $id) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const createUserCardToken = gql`
  ${userFragment}
  mutation CreateUserCardToken($input: CardTokenInput!) {
    accountCardTokenCreate(input: $input) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const deleteUserCardToken = gql`
  ${userFragment}
  mutation DeleteUserCardToken($id: ID!) {
    accountCardTokenDelete(id: $id) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;
