import {
  Checkout_availableShippingMethods,
  Checkout_lines_variant_attributes,
  Checkout_lines_variant_pricing,
  Checkout_lines_variant_product
} from "../fragments/gqlTypes/Checkout";
import { ICategory } from "@app/types/ICategory";
import { ProductDetails_product_variants_pricing } from '../queries/gqlTypes/ProductDetails';
import { IProductVariantPricing } from '@app/types/IProductVariantPricing';
import { IDiscount, IShippingPrice, ISubtotalPrice, IItems } from "../api/Cart/types";
import { ITotalPrice } from '@temp/@sdk/api/Cart/types';

export enum LocalStorageItems {
  CHECKOUT = "data_checkout",
  DISTRICT_SELECTED = "district_selected",
  FINAL_CHECKOUT = "final_checkout",
  FINAL_USECART = "final_use_cart",
  JOB_QUEUE_CHECKOUT = "job_queueCheckout",
  PAYMENT = "data_payment",
  RESET_PASSWORD_EMAIL = "reset_password_email",
  SHOW_ADDRESS_GEOCALIZATION_INFO= "show_address_geocalization_info",
}

export interface ICheckoutModelLineTotalPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface ICheckoutModelLineVariantProduct extends Checkout_lines_variant_product  {
  category?: ICategory | null;

}

export interface ICheckoutModelLineVariant {
  attributes?: Checkout_lines_variant_attributes[];
  id: string;
  isAvailable?: boolean | null;
  name?: string;
  sku?: string;
  pricing?: Checkout_lines_variant_pricing  | null;
  product?: ICheckoutModelLineVariantProduct;
  quantityAvailable?: number;
}


export interface ICheckoutModelLineVariantLocalStorage {
  id: string;
  product: {
    id: string | undefined,
    name: string | undefined,
    pricing?: ProductDetails_product_variants_pricing | IProductVariantPricing | undefined | null,
    quantityAvailable?: number,
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

export interface ICheckoutModelShippingMethod {
  id: string;
  name: string;
  price: ICheckoutModelPriceValue | null;
}

export interface ICheckoutModelPromoCodeDiscount {
  voucherCode?: string | null;
  discount?: ICheckoutModelPriceValue | null;
  discountName?: string | null;
  voucherType?: string | null;
  voucherDiscountType?: string | null;
  voucherDiscountValue?: number | undefined;
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
  scheduleTime:IScheduleTime;
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
   * Two-digit number representing the card’s expiration month.
   */
  expMonth?: number;
  /**
   * Four-digit number representing the card’s expiration year.
   */
  expYear?: number;
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
  availableShippingMethods?: Checkout_availableShippingMethods[];
  shippingMethod?: ICheckoutModelShippingMethod | null;
  requestPayload?: string;
  dataTreatmentPolicy?: boolean;
  termsAndConditions?: boolean;
  documentNumber?: string | null;
  scheduleDate?: IScheduleDate | null;
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
  scheduleDate?: IShippingMethodUpdateScheduleDate
}

// export interface IJobsModel {
//   cart: {
//     setCartItem?: boolean;
//   };
//   checkout: {
//     setPromoCode?: boolean;
//   };
// }

// export const JobsModelInitialState: IJobsModel = {
//   cart: {
//     setCartItem: false,
//   },
//   checkout: {
//     setPromoCode: false,
//   },
// };

export interface ISelecValue {
  code: string;
  description: string;
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel | null;
  setCheckout(checkout: ICheckoutModel | null): void;
  getDistrict(): ISelecValue | null;
  setDistrict(district: ISelecValue): void;
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
