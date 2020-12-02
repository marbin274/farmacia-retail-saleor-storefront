import { generatePageUrl } from "./utils";
import { OrderDirection, ProductOrderField } from "@sdk/gqlTypes/globalTypes";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 6;
export const SUPPORT_EMAIL = "support@example.com";
export const URL_WEB = "https://master.d31lwuq0j77p69.amplifyapp.com/"; // TODO: we need to modify/replace this line

export const HOME_PAGE_CONF = {
  PAGE_SIZE: 8,
  SORT_DIR: OrderDirection.ASC,
  SORT_FIELD: ProductOrderField.PRICE,
};
export const PROVIDERS = {
  AUNA: {
    id: "farmacia-retail.payments.niubiz",
    label: "AUNA Payments Gateway",
  },
  BRAINTREE: {
    id: "mirumee.payments.braintree",
    label: "Braintree",
  },
  CASH: {
    id: "mirumee.payments.cash",
    label: "Contra entrega : paga en efectivo a la entrega ",
  },
  DUMMY: {
    id: "mirumee.payments.dummy",
    label: "AUNA Payments Gateway",
  },
  STRIPE: {
    href: "https://js.stripe.com/v3/",
    id: "mirumee.payments.stripe",
    label: "Stripe",
  },
};
export const billingAddressAlwaysSameAsShipping = true;
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "facebook",
    href: "https://www.facebook.com/mirumeelabs/",
    path: require("../images/facebook-icon.svg"),
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/mirumeelabs/",
    path: require("../images/instagram-icon.svg"),
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/getsaleor",
    path: require("../images/twitter-icon.svg"),
  },
  {
    ariaLabel: "youtube",
    href: "https://www.youtube.com/channel/UCg_ptb-U75e7BprLCGS4s1g/videos",
    path: require("../images/youtube-icon.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "Written with React and TypeScript.",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Farmacia Digital",
  type: "website",
  url: window.location.origin,
};
export enum CheckoutStep {
  Address = 1,
  Shipping,
  Payment,
  Review,
}
export const CHECKOUT_STEPS = [
  {
    index: 0,
    link: "/checkout/address",
    name: "Paso 1: Completa los datos",
    nextActionName: "Ir a Pago",
    nextStepLink: "/checkout/payment",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Address,
  },
  // {
  //   index: 1,
  //   link: "/checkout/shipping",
  //   name: "Paso 2: Elige el horario de entrega",
  //   nextActionName: "Ir a pago",
  //   nextStepLink: "/checkout/payment",
  //   onlyIfShippingRequired: true,
  //   step: CheckoutStep.Shipping,
  // },
  {
    index: 1,
    link: "/checkout/payment",
    name: "Paso 2: Selecciona el método de pago",
    nextActionName: "Ir a confirmación",
    nextStepLink: "/checkout/review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 2,
    link: "/checkout/review",
    name: "Paso 3: Revisa tu compra",
    nextActionName: "Pagar",
    nextStepLink: "/order-finalized",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
];
