import React from "react";
import { PaymentGatewaysList } from "../PaymentGatewaysList";

import * as S from "./styles";
import { IProps } from "./types";
import checkoutCupon from "@temp/images/auna/checkout-cupon-small.svg";

import { DiscountForm } from "../DiscountForm";
import { IDiscountFormData } from "../DiscountForm/types";
import ReactSVG from "react-svg";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  gatewayErrors,
  promoCodeErrors,
  clearPromoCodeErrors,
  checkoutBillingAddress,
  paymentGateways,
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
  changeRequestPayload,
  requestPayload,
  totalPrice,
  userDataForNiubiz,
}: IProps) => {

  const [showLabelCupon, setShowLabelCupon] = React.useState<boolean>(true);

  const handleSubmitPromoCode = (discountForm?: IDiscountFormData) => {
    const newPromoCode = discountForm?.promoCode;
    const savedPromoCode = promoCodeDiscount?.voucherCode;

    if (newPromoCode && newPromoCode !== savedPromoCode) {
      addPromoCode(newPromoCode);
    } else {
      submitUnchangedDiscount();
    }
  };

  return (
    <S.Wrapper>
      { showLabelCupon && (<S.CuponWraper>
        <ReactSVG path={checkoutCupon} className={"checkout_icon"} />
        <S.CuponLabel>
          Tengo un cupón de descuento
        </S.CuponLabel>
      </S.CuponWraper>
      )}  
      <S.DiscountField>
        <DiscountForm
          setShowLabelCupon= {(show)=>{setShowLabelCupon(show)}}
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
        changeRequestPayload={changeRequestPayload}
        requestPayload={requestPayload}
        totalPrice={totalPrice}
        userDataForNiubiz={userDataForNiubiz}
        voucherCode={promoCodeDiscount?.voucherCode}
      />
    </S.Wrapper>
  );
};

export { CheckoutPayment };
