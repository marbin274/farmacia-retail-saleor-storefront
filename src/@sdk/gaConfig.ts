import { LocalRepository } from '@temp/@sdk/repository';
declare global {
  interface Window {
    dataLayer: any;
  }
}

export enum steps {
  addressCheckoutRoute = 1,
  filledContactUserData,
  privacyPolicyAcepted,
  filledInputForAddress,
  shippingMethodSelected,
  paymentCheckoutRoute,
  reviewCheckoutRoute,
}

export const ecommerceProductsMapper = (products?: any[] | null) => {
  return (
    products?.map((product) => ({
      brand: ``,
      category: product?.variant?.product?.category?.name || ``,
      id: product?.variant?.sku,
      list: ``,
      name: product?.productName || product?.name,
      position: ``,
      price:
        product?.unitPrice?.gross?.amount || product?.totalPrice?.gross?.amount,
      quantity: product?.quantity,
    })) || []
  );
};

export const launchRemoveToCartEvent = (
  id: string,
  name: string,
  price: any,
  quantity: number
) => {
  return pushToDatalayer({
    ecommerce: {
      remove: {
        products: [
          {
            brand: '',
            category: '',
            id,
            name,
            price,
            quantity,
            variant: '',
          },
        ],
      },
    },
    event: 'removeFromCart',
  });
};

export const launchAddToCartEvent = (
  id: string,
  name: string,
  price: number,
  quantity: number,
  currencyCode: string,
  metric1?: boolean
) => {
  return pushToDatalayer({
    ecommerce: {
      add: {
        products: [
          {
            brand: '',
            category: '',
            id,
            name,
            price,
            quantity,
            variant: '',
            metric1, // isPersonalizeProduct
          },
        ],
      },
      currencyCode,
    },
    event: 'addToCart',
  });
};

export const launchCheckoutEvent = (
  step: number,
  products?: any[],
  eventCallback?: () => void
) => {
  return pushToDatalayer({
    ecommerce: {
      checkout: {
        actionField: { step, option: '' },
        products,
      },
    },
    event: 'checkout',
    eventCallback,
  });
};

export const launchCheckoutFilledContactUserDataEvent = () => {
  launchCheckoutEvent(
    steps.filledContactUserData,
    ecommerceProductsMapper(getLocalStorageForCart())
  );
};

export const launchCheckoutPrivacyPolicyAceptedEvent = () => {
  launchCheckoutEvent(
    steps.privacyPolicyAcepted,
    ecommerceProductsMapper(getLocalStorageForCart())
  );
};

export const launchCheckoutFilledInputForAddressEvent = () => {
  launchCheckoutEvent(
    steps.filledInputForAddress,
    ecommerceProductsMapper(getLocalStorageForCart())
  );
};

export const launchDetailProductEvent = (
  name: string,
  id: string,
  price: number,
  category: string
) => {
  return pushToDatalayer({
    ecommerce: {
      detail: {
        actionField: { list: '' },
        products: [
          {
            id,
            name,
            price,
            category,
          },
        ],
      },
    },
    event: 'detail',
  });
};

export const launchPurchaseEvent = (
  id: string,
  revenue: number,
  tax: number,
  products: any[]
) => {
  return pushToDatalayer({
    ecommerce: {
      purchase: {
        actionField: {
          affiliation: 'Online Store',
          id,
          revenue,
          shipping: '',
          tax,
        },
        products,
      },
    },
    event: 'purchase',
  });
};

export const launchSetLocation = () => {
  return pushToDatalayer({
    originalLocation: `${document.location.protocol}//${document.location.hostname}${document.location.pathname}${document.location.search}`,
  });
};

const pushToDatalayer = (data: any) => {
  return window?.dataLayer?.push({ ...data, userId: getGaUserId() || '' });
};

export const setGaUserId = (id?: string) => {
  const localRepository = new LocalRepository();
  localRepository.setGaUserId(id || '');
};

export const removeGaUserId = () => {
  const localRepository = new LocalRepository();
  localRepository.setGaUserId(null);
};

export const getGaUserId = () => {
  const localRepository = new LocalRepository();
  return localRepository.getGaUserId() || '';
};

export const launchSearchEvent = (searchTerm?: string) => {
  return pushToDatalayer({
    event: 'search',
    searchTerm,
  });
};
export const getLocalStorageForCart = () => {
  const localRepository = new LocalRepository();
  return localRepository.getCheckout()?.lines;
};
