declare global {
  interface Window {
    dataLayer: any;
  }
}

const GA_USER_ID_KEY = "@user_id";

export enum steps {
  address = 1,
  payment,
  review,
}

export const ecommerceProductsMapper = (products?: any[] | null) => {
  return products?.map(product => ({
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
  })) || [];
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
  return pushToDatalayer({
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
  return pushToDatalayer({
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
  return pushToDatalayer({
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
  return pushToDatalayer({
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
  return pushToDatalayer({
    originalLocation: `${document.location.protocol}//${document.location.hostname}${document.location.pathname}${document.location.search}`,
  });
};

const pushToDatalayer = (data: any) => {
  return window?.dataLayer?.push({ ...data, userId: getGaUserId() });
};

export const setGaUserId = (id?: string) => {
  localStorage.setItem(GA_USER_ID_KEY, id || "");
};

export const removeGaUserId = () => {
  localStorage.removeItem(GA_USER_ID_KEY);
};

export const getGaUserId = () => {
  return localStorage.getItem(GA_USER_ID_KEY) || "";
};

export const launchSearchEvent = (searchTerm?: string) => {
  return pushToDatalayer({
    event: "search",
    searchTerm,
  });
};
