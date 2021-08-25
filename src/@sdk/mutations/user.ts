import gql from 'graphql-tag';
import { userFragment } from '../fragments/auth';

export const changeUserPassword = gql`
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        field
        message
      }
    }
  }
`;

export const accountUpdate = gql`
  ${userFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
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

export const setPassword = gql`
  ${userFragment}
  mutation SetPassword($token: String!, $email: String!, $password: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      errors {
        field
        message
      }
      token
      user {
        ...User
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const saveFavoriteCategories = gql`
  mutation SaveFavoriteCategories($categories: [FavoriteCategoryInput]!) {
    accountSetFavoriteCategories(categories: $categories) {
      user {
        favoriteCategories
      }
      accountErrors {
        message
      }
    }
  }
`;

export const setAccountConfirm = gql`
  mutation AccountConfirm($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const passwordResetMutation = gql`
  mutation ResetPassword($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;

export const accountRegisterMutation = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $redirectUrl: String!
    $firstName: String
    $lastName: String
    $termsAndConditions: Boolean
    $dataTreatmentPolicy: Boolean
    $documentNumber: String
  ) {
    accountRegister(
      input: {
        password: $password
        email: $email
        redirectUrl: $redirectUrl
        firstName: $firstName
        lastName: $lastName
        termsAndConditions: $termsAndConditions
        dataTreatmentPolicy: $dataTreatmentPolicy
        documentNumber: $documentNumber
      }
    ) {
      errors {
        field
        message
      }
      requiresConfirmation
    }
  }
`;
