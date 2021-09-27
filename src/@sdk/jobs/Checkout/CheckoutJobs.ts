import {
  DataErrorCheckoutTypes,
  ICreditCard,
  IPrivacyPolicy,
} from '@sdk/api/Checkout/types';
import { NetworkManager } from '@sdk/network';
import {
  ICheckoutAddress,
  ICreateCheckout,
  IShippingMethodUpdate,
  IUpdateCheckout,
  LocalRepository,
} from '@sdk/repository';

import { PromiseCheckoutJobRunResponse } from '../types';

export class CheckoutJobs {
  private networkManager: NetworkManager;
  private repository: LocalRepository;

  constructor(repository: LocalRepository, networkManager: NetworkManager) {
    this.networkManager = networkManager;
    this.repository = repository;
  }

  createCheckout = async (
    createCheckout: ICreateCheckout
  ): PromiseCheckoutJobRunResponse => {
    const { checkoutErrors, data, error } =
      await this.networkManager.createCheckout(createCheckout);

    if (checkoutErrors?.length! > 0) {
      return {
        checkoutErrors,
      };
    } else if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...data,
        selectedBillingAddressId: createCheckout?.shippingAddress?.id,
        selectedShippingAddressId: createCheckout?.shippingAddress?.id,
      });
      return {
        data,
      };
    }
  };

  updateCheckout = async (
    createCheckout: IUpdateCheckout
  ): PromiseCheckoutJobRunResponse => {
    const { checkoutErrors, data, error } =
      await this.networkManager.updateCheckout(createCheckout);

    if (checkoutErrors?.length! > 0) {
      return {
        checkoutErrors,
      };
    } else if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...data,
        selectedBillingAddressId: createCheckout?.shippingAddress?.id,
        selectedShippingAddressId: createCheckout?.shippingAddress?.id,
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
    const districtId = this.repository.getDistrict()?.id;

    const { checkoutErrors, data, error } =
      await this.networkManager.setShippingAddress(
        shippingAddress,
        email,
        checkoutId,
        documentNumber,
        privacyPolicy,
        districtId
      );

    if (checkoutErrors?.length! > 0) {
      return {
        checkoutErrors,
      };
    } else if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        availablePaymentGateways: data?.availablePaymentGateways,
        availableShippingMethods: data?.availableShippingMethods,
        billingAsShipping: false,
        dataTreatmentPolicy: data?.dataTreatmentPolicy,
        deliveryDate: data?.deliveryDate,
        documentNumber: data?.documentNumber,
        email: data?.email,
        selectedShippingAddressId,
        shippingAddress: data?.shippingAddress,
        shippingMethod: data?.shippingMethod,
        slotId: data?.slotId,
        slots: data?.slots,
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
    const districtId = this.repository.getDistrict()?.id;

    const { data, error } = await this.networkManager.setBillingAddress(
      billingAddress,
      checkoutId,
      districtId
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

    const districtId = this.repository.getDistrict()?.id;

    const { data, error } =
      await this.networkManager.setBillingAddressWithEmail(
        billingAddress,
        email,
        checkoutId,
        districtId
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
    const districtId = this.repository.getDistrict()?.id;

    const { data, error } = await this.networkManager.setShippingMethod(
      shippingMethodUpdate,
      checkoutId,
      districtId
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
        availablePaymentGateways: data?.availablePaymentGateways,
        availableShippingMethods: data?.availableShippingMethods,
        deliveryDate: data?.deliveryDate,
        promoCodeDiscount: data?.promoCodeDiscount,
        scheduleDate: data?.scheduleDate,
        shippingMethod: data?.shippingMethod,
        slotId: data?.slotId,
        slots: data?.slots,
        userSelectedSlotId: data?.userSelectedSlotId,
      };
      this.repository.setCheckout(newCheckout);
      return { data };
    }
  };

  clearCheckout = () => {
    const checkout = this.repository.getCheckout();

    const newCheckout = {
      ...checkout,
      availableShippingMethods: [],
      id: undefined,
      scheduleDate: null,
      shippingMethod: null,
      slotId: undefined,
      slots: undefined,
      token: undefined,
    };

    this.repository.setCheckout(newCheckout);
  };

  addPromoCode = async ({
    checkoutId,
    promoCode,
  }: {
    checkoutId: string;
    promoCode: string;
  }): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();
    const districtId = this.repository.getDistrict()?.id;

    const { data, error } = await this.networkManager.addPromoCode(
      promoCode,
      checkoutId,
      districtId
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
    const districtId = this.repository.getDistrict()?.id;

    const { data, error } = await this.networkManager.removePromoCode(
      promoCode,
      checkoutId,
      districtId
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
    withToken,
  }: {
    checkoutId: string;
    amount: number;
    paymentGateway: string;
    paymentToken: string;
    billingAddress: ICheckoutAddress;
    creditCard?: ICreditCard;
    withToken?: boolean;
  }): PromiseCheckoutJobRunResponse => {
    const payment = this.repository.getPayment();
    const districtId = this.repository.getDistrict()?.id;

    const { data, error } = await this.networkManager.createPayment(
      amount,
      checkoutId,
      paymentGateway,
      paymentToken,
      billingAddress,
      districtId,
      withToken
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
    const districtId = this.repository.getDistrict()?.id;

    const { data, error } = await this.networkManager.completeCheckout(
      checkoutId,
      paymentData,
      districtId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    } else {
      this.repository.setFinallCheckout(this.repository.getCheckout());
      this.repository.setCheckout({});
      // this.repository.setPayment({}); // descomentar si se llegara a separar la confirmación del checkout del pago nuevamente
      return { data };
    }
  };
}
