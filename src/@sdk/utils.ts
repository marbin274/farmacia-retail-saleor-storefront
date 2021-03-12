import { MapFn, QueryShape, WatchMapFn } from "./types";

// errors are nested in data as it currently stands in the API
// this helper extracts all errors present
export const getErrorsFromData = <T extends { [key: string]: any }>(
  data: T
) => {
  try {
    const error = Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        ...(data[key].errors &&
          !!data[key].errors.length && { userInputErrors: data[key].errors }),
      };
    }, {});

    return !!Object.keys(error).length ? error : null;
  } catch (e) {
    return null;
  }
};

export const isDataEmpty = <T extends { [key: string]: any }>(data: T) =>
  Object.keys(data).reduce((_, key) => !!data[key], true);

export function getMappedData<T extends QueryShape, TResult>(
  mapFn: MapFn<T, TResult> | WatchMapFn<T, TResult>,
  data: any
) {
  if (!data) {
    return null;
  }

  const mappedData = mapFn(data);
  const result =
    mappedData && !!Object.keys(mappedData).length ? mappedData : null;

  return result;
}

export const mergeEdges = (prevEdges: any[], newEdges: any[]) => [
  ...prevEdges,
  ...newEdges.filter(edge => !prevEdges.some(e => e.node.id === edge.node.id)),
];

export function filterNotEmptyArrayItems<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export const ecommerceProductMapper = (products: any[]) => {
  return products.map(product => ({
    brand: ``,
    category: ``,
    id: product.variant.sku,
    list: ``,
    name: product.name,
    position: ``,
    price: product.totalPrice.gross.amount,
    quantity: product.quantity,
    variant: ``,
  }));
};

export const ecommerceProductsMapper = (products: any[]) => {
  return products.map(product => ({
    brand: ``,
    category: ``,
    id: product.variant.sku,
    list: ``,
    name: product.productName,
    position: ``,
    price: product.unitPrice.gross.amount,
    quantity: product.quantity,
    variant: ``,
  }));
};

export const removeToCartEvent = (
  id: string,
  name: string,
  price: any,
  quantity: number
) => {
  return {
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
  };
};

export const addToCartEvent = (
  id: string,
  name: string,
  price: any,
  quantity: number,
  currencyCode: string
) => {
  return {
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
  };
};

export const checkoutEvent = (
  step: number,
  products?: any[],
  eventCallback?: () => void
) => {
  return {
    ecommerce: {
      checkout: {
        actionField: { step, option: "" },
        products,
      },
    },
    event: "checkout",
    eventCallback,
  };
};

export const onCheckoutOption = (step: number, checkoutOption: string) => {
  return window?.dataLayer?.push({
    ecommerce: {
      checkout_option: {
        actionField: { step, checkoutOption },
      },
    },
    event: "checkoutOption",
  });
};

export enum steps {
  address = 1,
  payment,
  review,
}

export const launchCheckoutGaEvent = () => {
  return window?.dataLayer?.push(checkoutEvent(steps.address));
};

export const detailProductEvent = (name: string, id: string, price: number) => {
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
  });
};

export const launchDetailProductEvent = (
  name: string,
  id: string,
  price: number
) => {
  return detailProductEvent(name, id, price);
};
