import { 
  basicProductFragment, 
  productPricingFragment 
} from "@temp/views/Product/queries";
import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import {
  SelledProducts,
  SelledProductsVariables
} from "./gqlTypes/SelledProducts";



export const selledProducts = gql`
${basicProductFragment}
${productPricingFragment}
query SelledProducts($districtId: ID, $period: ReportingPeriod!, $first: Int){
  reportProductSales(district: $districtId, period: $period, first: $first) {
    edges {
      node {
        id
        revenue(period: $period) {
          gross {
            amount
            currency
            __typename
          }
          __typename
        }
        attributes {
          values {
            id
            name
            __typename
          }
          __typename
        }
        product {
          ...BasicProductFields
          ...ProductPricingField
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
            }
          }
          category {
            id
            name
          }
          variants {
            id
            sku
            pricing {
              onSale
              price {
                ...Price
              }
              priceUndiscounted {
                ...Price
              }
            }
            quantityAvailable(district: $districtId)
          }
        }
        quantityOrdered
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

export const TypedSelledProductsQuery = TypedQuery<
  SelledProducts,
  SelledProductsVariables
>(selledProducts);
