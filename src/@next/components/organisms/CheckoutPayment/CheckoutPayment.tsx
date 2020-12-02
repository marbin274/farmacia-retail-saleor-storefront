import React, { useEffect, useState } from "react";

import { PaymentGatewaysList } from "../PaymentGatewaysList";

import * as S from "./styles";
import { IProps } from "./types";

import { Checkbox } from "@components/atoms";
import { DiscountForm } from "../DiscountForm";
import { IDiscountFormData } from "../DiscountForm/types";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  gatewayErrors,
  billingErrors,
  promoCodeErrors,
  clearPromoCodeErrors,
  selectedUserAddressId,
  userAddresses,
  billingAsShippingAddress = false,
  checkoutBillingAddress,
  countries,
  billingFormRef,
  billingFormId,
  paymentGateways,
  setBillingAddress,
  billingAsShippingPossible,
  setBillingAsShippingAddress,
  promoCodeDiscountFormId,
  promoCodeDiscountFormRef,
  promoCodeDiscount,
  addPromoCode,
  removeVoucherCode,
  submitUnchangedDiscount,
  selectedPaymentGateway,
  selectedPaymentGatewayToken,
  selectPaymentGateway,
  gatewayFormRef,
  gatewayFormId,
  processPayment,
  onGatewayError,
  requestPayload,
  totalPrice,
}: IProps) => {
  const [showPromoCodeForm, setShowPromoCodeForm] = useState(
    !!promoCodeDiscount?.voucherCode
  );

  useEffect(() => {
    // console.log(checkoutBillingAddress)

    const isVoucherCode = !!promoCodeDiscount?.voucherCode;
    if (isVoucherCode) {
      setShowPromoCodeForm(isVoucherCode);
    }
  }, [promoCodeDiscount?.voucherCode]);

  const handleChangeShowPromoCodeForm = () => {
    setShowPromoCodeForm(!showPromoCodeForm);
    promoCodeErrors = [];
    clearPromoCodeErrors();
  };

  const handleSubmitPromoCode = (discountForm?: IDiscountFormData) => {
    const newPromoCode = discountForm?.promoCode;
    const savedPromoCode = promoCodeDiscount?.voucherCode;

    if ((!newPromoCode || !showPromoCodeForm) && savedPromoCode) {
      removeVoucherCode(savedPromoCode);
    } else if (newPromoCode && newPromoCode !== savedPromoCode) {
      addPromoCode(newPromoCode);
    } else {
      submitUnchangedDiscount();
    }
  };

  return (
    <S.Wrapper>
      <Checkbox
        data-cy="checkoutPaymentPromoCodeCheckbox"
        name="payment-promo-code"
        checked={showPromoCodeForm}
        onChange={handleChangeShowPromoCodeForm}
      >
        Tengo un código promocional
      </Checkbox>
      {showPromoCodeForm && (
        <S.DiscountField>
          <DiscountForm
            discount={{
              promoCode: promoCodeDiscount?.voucherCode,
              voucherDiscountType: promoCodeDiscount?.voucherDiscountType,
              voucherDiscountValue: promoCodeDiscount?.voucherDiscountValue,
              voucherType: promoCodeDiscount?.voucherType,
            }}
            formId={promoCodeDiscountFormId}
            formRef={promoCodeDiscountFormRef}
            handleSubmit={handleSubmitPromoCode}
            addPromoCode={handleSubmitPromoCode}
            removeVoucher={removeVoucherCode}
            errors={promoCodeErrors}
          />
        </S.DiscountField>
      )}
      <PaymentGatewaysList
        errors={gatewayErrors}
        paymentGateways={paymentGateways}
        formRef={gatewayFormRef}
        formId={gatewayFormId}
        processPayment={processPayment}
        selectedPaymentGateway={selectedPaymentGateway}
        selectedPaymentGatewayToken={selectedPaymentGatewayToken}
        selectPaymentGateway={selectPaymentGateway}
        checkoutBillingAddress={checkoutBillingAddress}
        onError={onGatewayError}
        requestPayload={requestPayload}
        totalPrice={totalPrice}
      />
    </S.Wrapper>
  );
};

export { CheckoutPayment };
