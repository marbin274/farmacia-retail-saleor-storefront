import {
  Checkout_availableShippingMethods,
  Checkout_lines_variant_attributes,
  Checkout_lines_variant_pricing,
  Checkout_lines_variant_product,
} from '../fragments/gqlTypes/Checkout';
import { ICategory } from '@app/types/ICategory';
import { ProductDetails_product_variants_pricing } from '../queries/gqlTypes/ProductDetails';
import { IProductVariantPricing } from '@app/types/IProductVariantPricing';
import {
  IDiscount,
  IShippingPrice,
  ISubtotalPrice,
  IItems,
} from '../api/Cart/types';
import {
  IAvailablePaymentGateways,
  IPrivacyPolicy,
} from '../api/Checkout/types';
import { ITotalPrice } from '@temp/@sdk/api/Cart/types';
import { ScheduleDateInput } from '../gqlTypes/globalTypes';

export enum LocalStorageItems {
  CHECKOUT = 'data_checkout',
  DISTRICT_CHANGED = 'district_changed',
  DISTRICT_SELECTED = 'district_selected',
  FINAL_CHECKOUT = 'final_checkout',
  FINAL_USECART = 'final_use_cart',
  JOB_QUEUE_CHECKOUT = 'job_queueCheckout',
  GA_USER_ID_KEY = '@user_id',
  OPTIMIZELY_USER_ID_KEY = '@opt_id',
  PAYMENT = 'data_payment',
  RESET_PASSWORD_EMAIL = 'reset_password_email',
  SHOW_ADDRESS_GEOCALIZATION_INFO = 'show_address_geocalization_info',
  PURCHASE_NUMBER = 'purchase_number',
  TOKEN = 'token',
}

export interface ICheckoutModelLineTotalPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface ICheckoutModelLineVariant {
  attributes?: Checkout_lines_variant_attributes[];
  id: string;
  isAvailable?: boolean | null;
  name?: string;
  sku?: string;
  pricing?: Checkout_lines_variant_pricing | null;
  product?: Checkout_lines_variant_product;
  quantityAvailable?: number;
}

export interface ICheckoutModelLineVariantLocalStorage {
  id: string;
  product: {
    id: string | undefined;
    name: string | undefined;
    pricing?:
      | ProductDetails_product_variants_pricing
      | IProductVariantPricing
      | undefined
      | null;
    quantityAvailable?: number;
    category?: ICategory | null;
  };
}

export interface ICheckoutModelLine {
  id: string;
  name: string;
  quantity: number;
  totalPrice?: ICheckoutModelLineTotalPrice | null;
  variant: ICheckoutModelLineVariant;
}

export interface ICheckoutModelPriceValue {
  amount: number;
  currency: string;
  culture: string;
}

export interface ICheckoutModelPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface ICreateCheckout {
  email: string;
  districtId?: string;
  lines: Array<{ variantId: string; quantity: number }>;
  shippingAddress?: ICheckoutAddress;
  billingAddress?: ICheckoutAddress;
  privacyPolicy?: IPrivacyPolicy;
  documentNumber?: string;
  shippingMethodId?: string | null;
  scheduleDate?: ScheduleDateInput | null;
  slotId?: string | null;
}

export interface IUpdateCheckout extends ICreateCheckout {
  id: string;
}

export interface ICheckoutAddress {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string | null;
  country?: {
    code?: string;
    country?: string;
  };
  latitude?: number | null;
  longitude?: number | null;
}

export interface ICheckoutModelShippingMethodMethodType {
  id: string;
  code: string;
  name: string;
}

export interface ICheckoutModelShippingMethod {
  id: string;
  name: string;
  price: ICheckoutModelPriceValue | null;
  methodType: ICheckoutModelShippingMethodMethodType | null;
}

export interface ICheckoutModelPromoCodeDiscount {
  voucherCode?: string | null;
  discount?: ICheckoutModelPriceValue | null;
  discountName?: string | null;
  voucherType?: string | null;
  voucherDiscountType?: string | null;
  voucherDiscountValue?: number | undefined | null;
  message?: string | null;
}

export interface IScheduleTime {
  id: string;
  startTime: string;
  endTime: string;
}
export interface IScheduleDate {
  id: string;
  date: Date;
  scheduleTime: IScheduleTime;
}

export interface IPaymentCreditCard {
  /**
   * Card brand.
   */
  brand?: string;
  /**
   * The host name of the domain.
   */
  firstDigits?: string;
  /**
   * Last 4 digits of the card number.
   */
  lastDigits?: string;
  /**
   * Two-digit number representing the card???s expiration month.
   */
  expMonth?: number;
  /**
   * Four-digit number representing the card???s expiration year.
   */
  expYear?: number;
}

export interface IShippingSlot {
  id?: string;
  slotFrom?: string;
  slotTo?: string;
}

export interface ISlots {
  datetime?: string;
  express?: IShippingSlot[];
  express30?: IShippingSlot[];
  nextDay?: IShippingSlot[];
  scheduled?: IShippingSlot[];
}

export interface ICheckoutModel {
  id?: string;
  token?: any;
  email?: string;
  shippingAddress?: ICheckoutAddress | null;
  billingAddress?: ICheckoutAddress | null;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  billingAsShipping?: boolean;
  promoCodeDiscount?: ICheckoutModelPromoCodeDiscount;
  lines?: ICheckoutModelLine[] | null;
  availablePaymentGateways?: IAvailablePaymentGateways;
  availableShippingMethods?: Checkout_availableShippingMethods[];
  shippingMethod?: ICheckoutModelShippingMethod | null;
  requestPayload?: string;
  dataTreatmentPolicy?: boolean;
  termsAndConditions?: boolean;
  documentNumber?: string | null;
  scheduleDate?: IScheduleDate | null;
  isPrime?: boolean;
  slotId?: string;
  slots?: ISlots;
  deliveryDate?: string;
}

export interface IPaymentModel {
  id?: string;
  token?: string;
  gateway?: string;
  creditCard?: IPaymentCreditCard | null;
}

export interface IOrderModel {
  id?: string;
  token?: string;
  number?: string | null;
  sequentialCode?: string | null;
}

export interface IShippingMethodUpdateScheduleDate {
  scheduleTimeId: string;
  date: string;
}

export interface IShippingMethodUpdate {
  shippingMethodId: string;
  scheduleDate?: IShippingMethodUpdateScheduleDate;
  slotId?: string;
}

export interface ISelecValue {
  code: string;
  description: string;
}

export interface IDistrictSelected {
  id: string;
  name: string;
  warehouse: {
    id: string;
    name: string;
  } | null;
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel | null;
  setCheckout(checkout: ICheckoutModel | null): void;
  getDistrict(): IDistrictSelected | null;
  setDistrict(district: IDistrictSelected): void;
  getResetPasswordEmail(): string | null;
  setResetPasswordEmail(email: string): void;
  getPayment(): IPaymentModel | null;
  setPayment(payment: IPaymentModel | null): void;
}

export interface IUseCart {
  loaded?: boolean;
  discount: IDiscount;
  shippingPrice: IShippingPrice;
  subtotalPrice: ISubtotalPrice;
  totalPrice: ITotalPrice;
  items: IItems | undefined;
  sizeItems?: number;
}
