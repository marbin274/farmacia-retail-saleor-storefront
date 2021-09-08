import { ApolloError } from '@apollo/client';

import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IOrderModel,
  IPaymentModel,
  IShippingMethodUpdate,
} from '@sdk/repository';
import { IPrivacyPolicy } from '../api/Checkout/types';
import { VariantsProductsAvailable_productVariants } from '../queries/gqlTypes/VariantsProductsAvailable';
import { Checkout } from '../fragments/gqlTypes/Checkout';

export enum PendingSaveItems {
  UPDATE_CART = 'updateCart',
  BILLING_ADDRESS = 'billingAddress',
  SHIPPING_ADDRESS = 'shippingAddress',
  SHIPPING_AS_BILLING_ADDRESS = 'shippingAsBillingAddress',
}

export interface ApolloErrorWithUserInput extends ApolloError {
  extraInfo: {
    userInputErrors?: any[];
  };
}

export interface INetworkManagerResponse<T> {
  data?: T;
  error?: ApolloErrorWithUserInput;
}

export interface INetworkManager {
  getCheckout: (
    checkoutToken: string | null,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  getRefreshedCheckoutLines: (
    checkoutlines: ICheckoutModelLine[] | null,
    districtId: string
  ) => Promise<INetworkManagerResponse<ICheckoutModelLine[]>>;
  getCartLines: (
    checkoutlines: ICheckoutModelLine[] | null,
    districtId: string
  ) => Promise<
    INetworkManagerResponse<
      VariantsProductsAvailable_productVariants | null | undefined
    >
  >;
  createCheckout: (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    billingAddress?: ICheckoutAddress,
    privacyPolicy?: IPrivacyPolicy,
    documentNumber?: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setCartItem: (
    checkout: ICheckoutModel,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddress: (
    billingAddress: ICheckoutAddress,
    checkoutId: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddressWithEmail: (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAddress: (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    documentNumber?: string,
    privacyPolicy?: IPrivacyPolicy,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingMethod: (
    shippingMethodUpdate: IShippingMethodUpdate,
    checkoutId: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  addPromoCode: (
    promoCode: string,
    checkoutId: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  removePromoCode: (
    promoCode: string,
    checkoutId: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  createPayment: (
    amount: number,
    checkoutId: string,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress,
    districtId?: string,
    withToken?: boolean
  ) => Promise<INetworkManagerResponse<IPaymentModel>>;
  completeCheckout: (
    checkoutId: string,
    paymentData?: string,
    districtId?: string
  ) => Promise<INetworkManagerResponse<IOrderModel>>;
}

export interface IConstructCheckoutParams {
  checkout: Checkout;
  isPrime?: boolean;
  message?: string | null;
}
