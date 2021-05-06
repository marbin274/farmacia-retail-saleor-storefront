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
  const errorValidation = gatewayErrors? (gatewayErrors?.length > 0) : false
  const [showLabelCupon, setShowLabelCupon] = React.useState<boolean>(true);
  const [reRenderNiubiz, setReRenderNiubiz] = React.useState<boolean>(!errorValidation);
  const handleSubmitPromoCode = async (discountForm?: IDiscountFormData) => {
    const newPromoCode = discountForm?.promoCode;
    const savedPromoCode = promoCodeDiscount?.voucherCode;

    if (newPromoCode && newPromoCode !== savedPromoCode) {
      setReRenderNiubiz(false)
      await addPromoCode(newPromoCode);
      setReRenderNiubiz(true)
    } else {
      submitUnchangedDiscount();
    }
  };

  React.useEffect(()=>{
    if ((errorValidation) ){
      setReRenderNiubiz(!reRenderNiubiz)
      setTimeout(()=>{
        setReRenderNiubiz(true)
      },3000)
      
    }  
  }, [gatewayErrors])

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
          setReRenderNiubiz={(flag)=>{setReRenderNiubiz(flag)}}
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
