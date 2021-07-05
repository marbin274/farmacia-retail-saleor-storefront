import gql from "graphql-tag";

import { TypedQuery } from "../../../core/queries";
import { GetShippingMethods, GetShippingMethodsVariables } from "./gqlTypes/GetShippingMethods";

const shippingMethodsQuery = gql`
    query GetShippingMethods ($lines: [CheckoutLineInput]!){
        potentialShippingMethods(lines:$lines) {
            id
            isScheduled
            maximumOrderPrice {
                amount
                currency
                culture
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

export const TypedShippingMethods = TypedQuery<
  GetShippingMethods,
  GetShippingMethodsVariables
>(shippingMethodsQuery);
