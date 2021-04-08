import { IAvailableShippingMethods } from "@temp/@sdk/api/Checkout/types";

const shippingMethods: IAvailableShippingMethods = [
  {
    __typename:"ShippingMethod",
    id: "1",
    isScheduled: false,
    name: "Basic",
    price: {
      __typename:"Money",
      amount: 32,
      culture: "es-PE",
      currency: "USD",
    },
    scheduleDates:[],
    subtitle:"subTitle",
  },
  {
    __typename:"ShippingMethod",
    id: "2",
    isScheduled: false,
    name: "Extra",
    price: {
      __typename:"Money",
      amount: 64,
      culture: "es-PE",
      currency: "USD",
    },
    scheduleDates:[],
    subtitle:"subTitle",
  },
];

export const DEFAULT_PROPS = {
  shippingMethods,
};
