import { Checkout_availableShippingMethods } from '@sdk/fragments/gqlTypes/Checkout';
import { GetShopPaymentGateways_shop_availablePaymentGateways } from '@sdk/queries/gqlTypes/GetShopPaymentGateways';
import {
  ICheckoutModelPrice,
  ICheckoutModelPriceValue,
  IPaymentCreditCard,
  IScheduleDate,
  IShippingMethodUpdate,
} from '@sdk/repository';

import { PromiseQueuedResponse, PromiseRunResponse } from '../types';

export type IPrice = ICheckoutModelPrice | null | undefined;
export type IPriceValue = ICheckoutModelPriceValue | null | undefined;

export interface IAddress {
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

export interface IPrivacyPolicy {
  dataTreatmentPolicy?: boolean | null;
  termsAndConditions?: boolean;
}

export type IAvailableShippingMethods = Checkout_availableShippingMethods[];
export type IAvailablePaymentGateways =
  GetShopPaymentGateways_shop_availablePaymentGateways[];

export interface IShippingMethod {
  id: string;
  name: string;
  price?: IPriceValue | null;
}

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
  discountName?: string | null;
  voucherDiscountValue: number | undefined | null;
  voucherDiscountType: string | null | undefined;
  voucherType: string | null | undefined;
}

export type ICreditCard = IPaymentCreditCard;

export interface IPayment {
  id?: string;
  token?: string;
  gateway?: string;
  creditCard?: ICreditCard | null;
}

export interface ICheckout {
  id?: string;
  token: any;
  email?: string;
  shippingAddress?: IAddress | null;
  shippingMethod?: IShippingMethod | null;
  billingAddress?: IAddress | null;
  requestPayload?: string;
  scheduleDate?: IScheduleDate | null;
  dataTreatmentPolicy?: boolean;
  termsAndConditions?: boolean;
  documentNumber?: string | null;
  deliveryDate?: string;
}

export enum FunctionErrorCheckoutTypes {
  'SHIPPING_ADDRESS_NOT_SET',
  'ITEMS_NOT_ADDED_TO_CART',
  'EMAIL_NOT_SET',
}
export enum DataErrorCheckoutTypes {
  'SET_SHIPPING_ADDRESS',
  'SET_BILLING_ADDRESS',
  'SET_SHIPPING_METHOD',
  'ADD_PROMO_CODE',
  'REMOVE_PROMO_CODE',
  'CREATE_PAYMENT',
  'COMPLETE_CHECKOUT',
  'GET_CHECKOUT',
  'GET_PAYMENT_GATEWAYS',
}

export interface IAlteredLines {
  variantId: string;
  quantity: number;
}

export interface ISaleorCheckoutAPI {
  loaded: boolean;
  checkout?: ICheckout | null;
  promoCodeDiscount?: IPromoCodeDiscount;
  billingAsShipping?: boolean;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;
  availablePaymentGateways?: IAvailablePaymentGateways;
  payment?: IPayment;
  load: () => PromiseQueuedResponse;
  setBillingAddress: (
    billingAddress: IAddress,
    email?: string
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>;
  setShippingAddress: (
    shippingAddress: IAddress,
    email: string,
    privacyPolicy: IPrivacyPolicy,
    documentNumber: string
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>;
  setShippingMethod: (
    shippingMethodUpdate: IShippingMethodUpdate
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>;
  clearCheckout: () => PromiseRunResponse<
    DataErrorCheckoutTypes,
    FunctionErrorCheckoutTypes
  >;
  setBillingAsShippingAddress: () => PromiseRunResponse<
    DataErrorCheckoutTypes,
    FunctionErrorCheckoutTypes
  >;
  addPromoCode: (
    promoCode: string
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>;
  removePromoCode: (
    promoCode: string
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>;
  createPayment: (
    gateway: string,
    token: string,
    creditCard?: ICreditCard
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>;
  completeCheckout: () => PromiseRunResponse<
    DataErrorCheckoutTypes,
    FunctionErrorCheckoutTypes
  >;
}
