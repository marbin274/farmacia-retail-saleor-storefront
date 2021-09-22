import { aunaBrand5, aunaOrangeOnSale } from '@styles/constants';
import { IDistrictSelected } from '@temp/@sdk/repository';

export const BASE_URL = '/';
export const PRODUCTS_PER_PAGE = 8;
export const PRODUCTS_PER_PAGE_PERSONALIZE = 16;
export const COLLECTIONS_PER_PAGE = 8;
export const LANDING_COLLECTIONS_PER_PAGE = 100; // TODO: Cauando se llegue a implentar paginación cambiar a un valor menor
export const SUPPORT_EMAIL = 'support@example.com';
export const CONSULTATION_EMAIL = 'consultas@farmauna.com';

export const PROVIDERS = {
  AUNA: {
    id: 'farmacia-retail.payments.niubiz',
    label: 'Tarjeta de crédito/débito',
  },
  CASH: {
    id: 'mirumee.payments.cash',
    label: 'Contra entrega : paga en efectivo a la entrega ',
  },
  DUMMY: {
    id: 'mirumee.payments.dummy',
    label: 'AUNA Dummy Payments Gateway',
  },
  POS: {
    id: 'farmacia-retail.payments.pos',
    label: 'Pago contra entrega con tarjeta de Crédito / Débito POS',
  },
  YAPE: {
    id: 'farmacia-retail.payments.yape',
    label: 'Pago contra entrega Yape',
  },
};
export const billingAddressAlwaysSameAsShipping = true;

export const SOCIAL_MEDIA = [
  {
    ariaLabel: 'facebook',
    href: 'https://www.facebook.com/farmauna.pe',
    path: require('../images/auna/social/facebook.svg'),
    rel: 'noopener nofollow',
  },
  {
    ariaLabel: 'instagram',
    href: 'https://www.instagram.com/farmauna_pe/',
    path: require('../images/auna/social/instagram.svg'),
    rel: 'noopener nofollow',
  },
];
export const META_DEFAULTS = {
  custom: [],
  description:
    'Somos la experiencia digital más ágil de compra en farmacia, encuentra una gran variedad de productos ¡Pide y recibe en máximo 75 minutos!',
  image: `${window?.location?.origin}${require('../images/logo.svg')}`,
  title: 'Farmauna, la manera saludable de comprar',
  type: 'website',
  url: window?.location?.origin,
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
    link: '/checkout/address',
    name: 'Datos Personales',
    nextActionName: 'Continuar con el pago',
    nextStepLink: '/checkout/payment',
    onlyIfShippingRequired: true,
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: '/checkout/payment',
    name: 'Datos de Pago',
    nextActionName: 'Confirmar pago',
    nextStepLink: '/checkout/review',
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 2,
    link: '/checkout/review',
    name: '¡Listo!',
    nextActionName: 'Pagar y hacer pedido',
    nextStepLink: '/order-finalized',
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
];

export const DOCUMENTS_URLS_S3 = {
  finesAdicionalesUrls:
    'https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-fines-adicionales.pdf',
  politicasDePrivacidadUrl:
    'https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-politicas-privacidad.pdf',
  terminosYCondicionesUrl:
    'https://saleor-frontend-storage.s3.us-east-2.amazonaws.com/legal/farmacia-terminos-condiciones.pdf',
};

export const PRODUCT_STICKERS = {
  Agotado: {
    backgroundColor: aunaBrand5,
    label: 'Agotado',
  },
  Oferta: {
    backgroundColor: aunaOrangeOnSale,
    label: 'Oferta',
  },
};

export const SEARCH_PRODUCTS_QUERY_MIN_LENGTH = 3;
export const SHIPPING_FORMAT_DATE = 'yyyy-MM-dd';
export const HOURS_TO_FORMAT_DATE = 'T00:00:00';
export const SHIPPING_DISPLAY_FORMAT_DATE = 'dd/MM/yyyy';
export const HOURS_FORMAT = 'HH:mm:ss';

// TODO: revisar  cuando se tenga que pintar el poligono de cobertura con la data de backend
export const LIMA_BOUNDS: google.maps.LatLngBoundsLiteral = {
  east: -76.61,
  north: -11.56,
  south: -12.55,
  west: -77.23,
};

export const ADDRESS_FORM_SORT = {
  city: 7,
  dataTreatmentPolicy: 5,
  documentNumber: 1,
  email: 2,
  firstName: 0,
  phone: 3,
  streetAddress1: 6,
  streetAddress2: 8,
  termsAndConditions: 4,
};

export const ADDRESS_FORM_SHOW_GENERAL_ERRORS = 3;
export const ADDRESS_FORM_TOTAL_COUNT = 7;
export const MODAL_ADDRESS_GEOLOCALIZATION_TIMEOUT = 10000;
export const DISTRICT_SELECTED_DEFAULT: IDistrictSelected = {
  id: '',
  name: 'Miraflores',
  warehouse: null,
};
export const TOTAL_DISTRICT = 30; // TODO: this variable should be dinamically loaded from the backend

export const COUNTRY_DEFAULT = {
  code: 'PE',
  country: 'Peru',
};

export const COLLECTION_CATEGORY_FILTER_LABEL = 'Todas las categorías';

export const HIDE_CARDTOKENS_IN_CHECKOUT = false;
export const CHECKOUT_MANDATORY_COORDINATES = true;

export const FEATURE_PLUGINS = {
  lastMile: 'pharma.lastmile.auna',
};
export const DEFAULT_SORT = '-stock';

export const SHIPPING_TYPES = {
  express: 'EXPRESS',
  expressPrime: 'EXPRESS_PRIME',
  expressNextDay: 'EXPRESS_NEXTDAY',
  express30: 'EXPRESS_30',
  scheduled: 'SCHEDULED',
  scheduledPrime: 'SCHEDULED_PRIME',
};

export const SHIPPING_TYPE_KEYWORDS = {
  express: 'EXPRESS',
  scheduled: 'SCHEDULED',
  prime: 'PRIME',
};

export const PHONE_NUMBER = '01 6429911';
