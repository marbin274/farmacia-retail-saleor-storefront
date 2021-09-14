import { GetShopPaymentGateways_shop_availablePaymentGateways } from '../queries/gqlTypes/GetShopPaymentGateways';
import {
  ICheckoutModel,
  ICheckoutModelPrice,
  ICheckoutModelPriceValue,
  IPaymentModel,
} from '../repository';

export enum StateItems {
  CHECKOUT,
  SUMMARY_PRICES,
  PROMO_CODE,
  PAYMENT,
  PAYMENT_GATEWAYS,
}

export interface ISaleorStateSummeryPrices {
  shippingPrice?: ICheckoutModelPriceValue;
  subtotalPrice?: ICheckoutModelPrice;
  totalPrice?: ICheckoutModelPrice;
  discount?: ICheckoutModelPriceValue;
}

export interface ISaleorState {
  checkout?: ICheckoutModel;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  summaryPrices?: ISaleorStateSummeryPrices;
  payment?: IPaymentModel;
  shopPaymentGateways?: GetShopPaymentGateways_shop_availablePaymentGateways[];
}
