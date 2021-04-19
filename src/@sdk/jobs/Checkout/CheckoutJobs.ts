import {
  DataErrorCheckoutTypes,
  ICreditCard,
  IPrivacyPolicy,
} from "@sdk/api/Checkout/types";
import { NetworkManager } from "@sdk/network";
import { ICheckoutAddress, IShippingMethodUpdate, LocalRepository } from "@sdk/repository";

import { PromiseCheckoutJobRunResponse } from "../types";

export class CheckoutJobs {
  private networkManager: NetworkManager;
  private repository: LocalRepository;

  constructor(repository: LocalRepository, networkManager: NetworkManager) {
    this.networkManager = networkManager;
    this.repository = repository;
  }

  createCheckout = async ({
    email,
    lines,
    shippingAddress,
    selectedShippingAddressId,
    billingAddress,
    selectedBillingAddressId,
    privacyPolicy,
    documentNumber,
  }: {
    email: string;
    lines: Array<{ variantId: string; quantity: number }>;
    shippingAddress?: ICheckoutAddress;
    selectedShippingAddressId?: string;
    billingAddress?: ICheckoutAddress;
    selectedBillingAddressId?: string;
    privacyPolicy?: IPrivacyPolicy;
    documentNumber: string;
  }): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.networkManager.createCheckout(
      email,
      lines,
      shippingAddress,
      billingAddress,
      privacyPolicy,
      documentNumber
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      // TODO: check later
      this.repository.setCheckout({
        ...data,
        selectedBillingAddressId,
        selectedShippingAddressId,
      });
      return {
        data,
      };
    }
  };

  setShippingAddress = async ({
    checkoutId,
    shippingAddress,
    email,
    selectedShippingAddressId,
    documentNumber,
    privacyPolicy,
  }: {
    checkoutId: string;
    shippingAddress: ICheckoutAddress;
    email: string;
    selectedShippingAddressId?: string;
    documentNumber: string;
    privacyPolicy: IPrivacyPolicy;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.networkManager.setShippingAddress(
      shippingAddress,
      email,
      checkoutId,
      documentNumber,
      privacyPolicy
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        availableShippingMethods: data?.availableShippingMethods,
        billingAsShipping: false,
        dataTreatmentPolicy: data?.dataTreatmentPolicy,
        documentNumber: data?.documentNumber,
        email: data?.email,
        selectedShippingAddressId,
        shippingAddress: data?.shippingAddress,
        shippingMethod: data?.shippingMethod,
        termsAndConditions: data?.termsAndConditions,
      });
      return { data };
    }
  };

  setBillingAddress = async ({
    checkoutId,
    billingAddress,
    billingAsShipping,
    selectedBillingAddressId,
  }: {
    checkoutId: string;
    billingAddress: ICheckoutAddress;
    billingAsShipping?: boolean;
    selectedBillingAddressId?: string;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.networkManager.setBillingAddress(
      billingAddress,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        billingAddress: data?.billingAddress,
        billingAsShipping: !!billingAsShipping,
        selectedBillingAddressId,
      });
      return { data };
    }
  };

  setBillingAddressWithEmail = async ({
    checkoutId,
    email,
    billingAddress,
    selectedBillingAddressId,
  }: {
    checkoutId: string;
    email: string;
    billingAddress: ICheckoutAddress;
    selectedBillingAddressId?: string;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const {
      data,
      error,
    } = await this.networkManager.setBillingAddressWithEmail(
      billingAddress,
      email,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        billingAddress: data?.billingAddress,
        billingAsShipping: false,
        email: data?.email,
        selectedBillingAddressId,
      });
      return { data };
    }
  };

  setShippingMethod = async ({
    checkoutId,
    shippingMethodUpdate,
  }: {
    checkoutId: string;
    shippingMethodUpdate: IShippingMethodUpdate;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.networkManager.setShippingMethod(
      shippingMethodUpdate,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    } else {
      const newCheckout = {
        ...checkout,
        availableShippingMethods: data?.availableShippingMethods,
        promoCodeDiscount: data?.promoCodeDiscount,
        scheduleDate: data?.scheduleDate,
        shippingMethod: data?.shippingMethod,
      };
      this.repository.setCheckout(newCheckout);
      return { data };
    }
  };

  addPromoCode = async ({
    checkoutId,
    promoCode,
  }: {
    checkoutId: string;
    promoCode: string;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.networkManager.addPromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        promoCodeDiscount: data?.promoCodeDiscount,
      });
      return { data };
    }
  };

  removePromoCode = async ({
    checkoutId,
    promoCode,
  }: {
    checkoutId: string;
    promoCode: string;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.networkManager.removePromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        promoCodeDiscount: data?.promoCodeDiscount,
      });
      return { data };
    }
  };

  createPayment = async ({
    checkoutId,
    amount,
    paymentGateway,
    paymentToken,
    billingAddress,
    creditCard,
  }: {
    checkoutId: string;
    amount: number;
    paymentGateway: string;
    paymentToken: string;
    billingAddress: ICheckoutAddress;
    creditCard?: ICreditCard;
  }): PromiseCheckoutJobRunResponse => {
    const payment = this.repository.getPayment();

    const { data, error } = await this.networkManager.createPayment(
      amount,
      checkoutId,
      paymentGateway,
      paymentToken,
      billingAddress
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    } else {
      this.repository.setPayment({
        ...payment,
        creditCard,
        gateway: data?.gateway,
        id: data?.id,
        token: data?.token,
      });
      return { data };
    }
  };

  completeCheckout = async ({
    checkoutId,
    paymentData,
  }: {
    checkoutId: string;
    paymentData?: string;
  }): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.networkManager.completeCheckout(
      checkoutId,
      paymentData
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    } else {
      // this.repository.setOrder(data);
      this.repository.setCheckout({});
      this.repository.setPayment({});
      return { data };
    }
  };
}
