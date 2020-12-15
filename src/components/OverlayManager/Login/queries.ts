import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "./gqlTypes/RegisterAccount";

const accountRegisterMutation = gql`
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

export const TypedAccountRegisterMutation = TypedMutation<
  RegisterAccount,
  RegisterAccountVariables
>(accountRegisterMutation);
