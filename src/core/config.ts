import { generatePageUrl } from "./utils";
import { OrderDirection, ProductOrderField } from "@sdk/gqlTypes/globalTypes";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 6;
export const SUPPORT_EMAIL = "support@example.com";
export const HOME_PAGE_CONF = {
  CATEGORY_ID: "Q2F0ZWdvcnk6MjM=", // jarabe category
  PAGE_SIZE: 20,
  SORT_DIR: OrderDirection.ASC,
  SORT_FIELD: ProductOrderField.PRICE,
};
export const PROVIDERS = {
  BRAINTREE: {
    label: "Braintree",
  },
  CASH: {
    label: "Contra entrega : paga en efectivo a la entrega ",
  },
  CREDIT_CARD: {
    label: "Tarjeta de Crédito",
  },
  DUMMY: {
    label: "Dummy",
  },
  STRIPE: {
    href: "https://js.stripe.com/v3/",
    label: "Stripe",
  },
};
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
  description:
    "Written with React and TypeScript.",
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
    nextActionName: "Ir a Delivery",
    nextStepLink: "/checkout/shipping",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: "/checkout/shipping",
    name: "Paso 2: Elije el horario de entrega",
    nextActionName: "Ir a pago",
    nextStepLink: "/checkout/payment",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Shipping,
  },
  {
    index: 2,
    link: "/checkout/payment",
    name: "Paso 3: Selecciona el método de pago",
    nextActionName: "Ir a confirmación",
    nextStepLink: "/checkout/review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 3,
    link: "/checkout/review",
    name: "Paso 4: Revisa tu compra",
    nextActionName: "Place order",
    nextStepLink: "/order-finalized",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
];
