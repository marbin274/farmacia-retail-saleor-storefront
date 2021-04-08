declare global {
  interface Window {
    dataLayer: any;
  }
}

export enum steps {
  address = 1,
  payment,
  review,
}

export const ecommerceProductsMapper = (products: any[]) => {
  return products.map(product => ({
    brand: ``,
    category: ``,
    id: product?.variant?.sku,
    list: ``,
    name: product?.productName || product?.name,
    position: ``,
    price:
      product?.unitPrice?.gross?.amount || product?.totalPrice?.gross?.amount,
    quantity: product?.quantity,
    variant: ``,
  }));
};

export const launchRemoveToCartEvent = (
  id: string,
  name: string,
  price: any,
  quantity: number
) => {
  return window?.dataLayer?.push({
    ecommerce: {
      remove: {
        products: [
          {
            brand: "",
            category: "",
            id,
            name,
            price,
            quantity,
            variant: "",
          },
        ],
      },
    },
    event: "removeFromCart",
  });
};

export const launchAddToCartEvent = (
  id: string,
  name: string,
  price: any,
  quantity: number,
  currencyCode: string
) => {
  return window?.dataLayer?.push({
    ecommerce: {
      add: {
        products: [
          {
            brand: "",
            category: "",
            id,
            name,
            price,
            quantity,
            variant: "",
          },
        ],
      },
      currencyCode,
    },
    event: "addToCart",
  });
};

export const launchCheckoutEvent = (
  step: number,
  products?: any[],
  eventCallback?: () => void
) => {
  return window?.dataLayer?.push({
    ecommerce: {
      checkout: {
        actionField: { step, option: "" },
        products,
      },
    },
    event: "checkout",
    eventCallback,
  });
};

export const launchDetailProductEvent = (
  name: string,
  id: string,
  price: number
) => {
  return window?.dataLayer?.push({
    ecommerce: {
      detail: {
        actionField: { list: "" },
        products: [
          {
            id,
            name,
            price,
          },
        ],
      },
    },
    event: "detail",
  });
};

export const launchEcommerceEvent = (
  id: string,
  revenue: number,
  tax: number,
  products: any[]
) => {
  return window?.dataLayer?.push({
    ecommerce: {
      purchase: {
        actionField: {
          affiliation: "Online Store",
          id,
          revenue,
          shipping: "",
          tax,
        },
        products,
      },
    },
    event: "purchase",
  });
};

export const launchSetLocation = () => {
  return window?.dataLayer?.push({
    originalLocation: `${document.location.protocol}//${document.location.hostname}${document.location.pathname}${document.location.search}`,
  });
};
