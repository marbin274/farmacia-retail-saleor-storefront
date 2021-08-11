import { priceFragment } from '@sdk/fragments/products';
import gql from 'graphql-tag';
import { TypedQuery } from '../../core/queries';
import { Banner } from './gqlTypes/Banner';
import { HomePage } from './gqlTypes/HomePage';

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
      product {
        category {
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
  }
`;

export const TypedHomePageQuery = TypedQuery<HomePage, {}>(homePageQuery);

export const bannerQuery = gql`
  query Banner {
    mainBanner {
      id
      frames {
        id
        link
        images {
          screenType
          url
        }
      }
    }
  }
`;

export const TypedBannerQuery = TypedQuery<Banner, {}>(bannerQuery);
