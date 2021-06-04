import {
  priceFragment
} from "@temp/views/Product/queries";
import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { HomePage } from "./gqlTypes/HomePage";


export const productVariantFragmentSimple = gql`
  ${priceFragment}
  fragment ProductVariantFieldsSimple on ProductVariant {
    id
    sku
    name
    quantityAvailable
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
      product{
        category{
          name
        }
      }
    }
  }
`;

// get all available products according the specified filter
export const homePageQuery = gql` 
  query HomePage {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
      }
      analyticsConfig {
        tagManagerId
        tagManagerAuth
        tagManagerEnvironmentId
      }
    }
    mainBanner {
        id,
        frames{
            id,
            link,
            images {
                screenType,
                url
            }
        }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery<HomePage, {}>(homePageQuery);
