import React from "react";
import { DiscountForm } from "../DiscountForm";
import { IDiscountFormData } from "../DiscountForm/types";
import { PaymentGatewaysList } from "../PaymentGatewaysList";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Payment options used in checkout.
 */
const CheckoutPayment: React.FC<IProps> = ({
  cartLinesUpdated,
  gatewayErrors,
  promoCodeErrors,
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
  const errorValidation = gatewayErrors ? gatewayErrors?.length > 0 : false;
  const [reRenderNiubiz, setReRenderNiubiz] = React.useState<boolean>(
    !errorValidation
  );
  const handleSubmitPromoCode = async (discountForm?: IDiscountFormData) => {
    const newPromoCode = discountForm?.promoCode;
    const savedPromoCode = promoCodeDiscount?.voucherCode;

    if (newPromoCode && newPromoCode !== savedPromoCode) {
      setReRenderNiubiz(false);
      await addPromoCode(newPromoCode);
      setReRenderNiubiz(true);
    } else {
      submitUnchangedDiscount();
    }
  };

  const refreshReRenderNiubiz = () => {
    setReRenderNiubiz(!reRenderNiubiz);
    setTimeout(() => {
      setReRenderNiubiz(true);
    }, 300);
  };

  React.useEffect(() => {
    if (errorValidation) {
      refreshReRenderNiubiz();
    }
  }, [gatewayErrors]);

  React.useEffect(() => {
    if (cartLinesUpdated) {
      refreshReRenderNiubiz();
    }
  }, [cartLinesUpdated]);

  return (
    <S.Wrapper>
      <S.CuponWraper>
        <S.CuponLabel>Cupón de descuento</S.CuponLabel>
      </S.CuponWraper>
      <S.DiscountField>
        <DiscountForm
          setReRenderNiubiz={flag => {
            setReRenderNiubiz(flag);
          }}
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
        reRender={reRenderNiubiz}
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
