import { aunaBrand5, aunaOrangeOnSale } from "@styles/constants";
import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 8;
export const SUPPORT_EMAIL = "support@example.com";
export const CONSULTATION_EMAIL = "consultas@farmauna.com";

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
    href: "https://www.facebook.com/farmauna.pe",
    path: require("../images/auna/social/facebook.svg"),
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/farmauna_pe/",
    path: require("../images/auna/social/instagram.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "Written with React and TypeScript.",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Farmauna",
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
    name: "Paso 2: Ingresa tu tarjeta",
    nextActionName: "Continuar a confirmación",
    nextStepLink: "/checkout/review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 2,
    link: "/checkout/review",
    name: "Paso 3: Revisa tu compra",
    nextActionName: "Pagar y hacer pedido",
    nextStepLink: "/order-finalized",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
];

export const MAX_ORDER_PER_PRODUCT = 50;

export const DOCUMENTS_URLS_S3 = {
  finesAdicionalesUrls: "https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-fines-adicionales.pdf",
  politicasDePrivacidadUrl: "https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf",
  terminosYCondicionesUrl: "https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf",
};

export const PRODUCT_STICKERS = {
  Agotado: {
    backgroundColor: aunaBrand5,
    label: "Agotado",
  },
  Oferta: {
    backgroundColor: aunaOrangeOnSale,
    label: "Oferta",
  },
}

export const ATTRIBUTE_PROMOTION_LIMIT_MAX_NAME = "limit-max";
export const SEARCH_PRODUCTS_QUERY_MIN_LENGTH = 3;
export const SHIPPING_FORMAT_DATE = "yyyy-MM-dd";
export const HOURS_TO_FORMAT_DATE = "T00:00:00";
export const SHIPPING_DISPLAY_FORMAT_DATE = "dd/MM/yyyy";
