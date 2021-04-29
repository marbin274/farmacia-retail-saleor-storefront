import { aunaBrand5, aunaOrangeOnSale } from "@styles/constants";
import { IPaymentGateway } from "@temp/@next/types";
import { environmentName, merchantPassword, merchantUsername, merchantId } from "@temp/constants";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 8;
export const LANDING_COLLECTIONS_PER_PAGE = 100; // TODO: Cauando se llegue a implentar paginación cambiar a un valor menor
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
  description: "Somos la experiencia digital más ágil de compra en farmacia, encuentra una gran variedad de productos ¡Pide y recibe en máximo 75 minutos!",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Farmauna, la manera saludable de comprar",
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
    nextActionName: "Pagar y confirmar",
    nextStepLink: "/checkout/review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 2,
    link: "/checkout/review",
    name: "Paso 3: Recibimos tu orden",
    nextActionName: "Pagar y hacer pedido",
    nextStepLink: "/order-finalized",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
];

export const MAX_ORDER_PER_PRODUCT = 50;

export const DOCUMENTS_URLS_S3 = {
  finesAdicionalesUrls:
    "https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-fines-adicionales.pdf",
  politicasDePrivacidadUrl:
    "https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf",
  terminosYCondicionesUrl:
    "https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf",
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
};

export const ATTRIBUTE_PROMOTION_LIMIT_MAX_NAME = "limit-max";
export const SEARCH_PRODUCTS_QUERY_MIN_LENGTH = 3;
export const SHIPPING_FORMAT_DATE = "yyyy-MM-dd";
export const HOURS_TO_FORMAT_DATE = "T00:00:00";
export const SHIPPING_DISPLAY_FORMAT_DATE = "dd/MM/yyyy";

// TODO: revisar  cuando se tenga que pintar el poligono de cobertura con la data de backend
export const LIMA_BOUNDS: google.maps.LatLngBoundsLiteral = {
  east: -76.61,
  north: -11.56,
  south: -12.55,
  west: -77.23,
};

const AVAILABLE_PAYMENTS_QA: IPaymentGateway[] = 
[
                {                   
                   config:[
                      {
                         field:"store_customer_card",
                         value:"false",
                      },
                      {
                         field:"gateway_name",
                         value:"Niubiz",
                      },
                      {
                         field:"auto_capture",
                         value:"false",
                      },
                      {
                         field:"merchant_id",
                         value:"522591303",
                      },
                      {
                         field:"nb_security_url",
                         value:"https://apitestenv.vnforapps.com/api.security/v1/security",
                      },
                      {
                         field:"nb_session_url",
                         value:"https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/",
                      },
                      {
                         field:"nb_js_url",
                         value:"https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true",
                      },
                      {
                         field:"nb_authorization_url",
                         value:"https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/",
                      },
                      {
                         field:"nb_payform_url",
                         value:"https://pocpaymentserve.s3.amazonaws.com/payform.min.js",
                      },
                      {
                         field:"nb_check_url",
                         value:"https://apisandbox.vnforappstest.com/api.authorization/v3/retrieve/purchase/",
                      },
                      {
                         field:"nb_cancel_url",
                         value:"https://apisandbox.vnforappstest.com/api.authorization/v3/void/",
                      },
                      {
                         field:"store_customer",
                         value:"false",
                      },
                      {
                         field:"require_3d_secure",
                         value:"false",
                      },
                   ],
                   id:"farmacia-retail.payments.niubiz",
                   name:"Niubiz",
                },
             ]

const AVAILABLE_PAYMENTS_PRD: IPaymentGateway[] = 
[
               {
                  "config":[
                     {
                        "field":"store_customer_card",
                        "value":"false",
                     },
                     {
                        "field":"gateway_name",
                        "value":"Niubiz",
                     },
                     {
                        "field":"auto_capture",
                        "value":"false",
                     },
                     {
                        "field":"merchant_id",
                        "value":merchantId,
                     },
                     {
                        "field":"merchant_username",
                        "value":merchantUsername,                         
                     },
                     {
                        "field":"merchant_password",
                        "value":merchantPassword,                         
                     },
                     {
                        "field":"nb_security_url",
                        "value":"https://apiprod.vnforapps.com/api.security/v1/security",
                     },
                     {
                        "field":"nb_session_url",
                        "value":"https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/",
                     },
                     {
                        "field":"nb_js_url",
                        "value":"https://static-content.vnforapps.com/v2/js/checkout.js",
                     },
                     {
                        "field":"nb_authorization_url",
                        "value":"https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/",
                     },
                     {
                        "field":"nb_payform_url",
                        "value":"https://static-content.vnforapps.com/elements/v1/payform.min.js",
                     },
                     {
                        "field":"nb_check_url",
                        "value":"https://apiprod.vnforapps.com/api.authorization/v3/retrieve/purchase/",
                     },
                     {
                        "field":"nb_cancel_url",
                        "value":"https://apiprod.vnforapps.com/api.authorization/v3/void/ecommerce/",
                     },
                     {
                        "field":"store_customer",
                        "value":"false",
                     },
                     {
                        "field":"require_3d_secure",
                        "value":"false",
                     },
                  ],
                  "id":"farmacia-retail.payments.niubiz",
                  "name":"Niubiz",
               },
            ]

export const AVAILABLE_PAYMENTS = environmentName === 'prod' ? AVAILABLE_PAYMENTS_PRD : AVAILABLE_PAYMENTS_QA
