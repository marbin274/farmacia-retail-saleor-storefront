import { CartResume, CheckoutProgressBar } from '@components/molecules';
import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { Container } from "@components/templates";
import mailSentSvg from "images/auna/mail-sent.svg";
import React from "react";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderNumber,
  continueShopping,
  orderDetails,
  overlay,
  sequentialCode,
  checkout,
  steps,
  payment,
  data,
  promoTaxedPrice,
  subtotalPrice,
  shippingTaxedPrice,
  totalPrice,
  totalProducts,
  selectedPaymentGatewayToken,
}: IProps) => {
  
  const checkoutShippingAddress = checkout?.shippingAddress
  ? {
      ...checkout?.shippingAddress,
      phone: checkout?.shippingAddress?.phone || undefined,
    }
  : undefined;
  
  
  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined; 
    const creditCardType = require("credit-card-type");

    const getCreditCardProvider = () => {
      if (payment?.creditCard) {
        const visaCards = creditCardType(payment?.creditCard.firstDigits);
        return visaCards[0].type;
      }
      return `visa`;
    };
  
    const getPaymentMethodDescription = () => {
      if (payment?.gateway === "mirumee.payments.dummy") {
        return `Dummy: ${
          dummyStatuses.find(
            status => status.token === selectedPaymentGatewayToken
          )?.label
        }`;
      }
      return ``;
    };
      

  return (
    <Container>
      <CheckoutProgressBar
          steps={steps}
          activeStepIndex={2}
          pathName={"/checkout/review"}
        />
      <S.Wrapper>
        <S.ThankYouHeader>
          <span>Gracias</span>
          <br />
          Recibimos tu orden!
        </S.ThankYouHeader>
        <S.OrderInfo>
          El código de tu orden es: <span>{sequentialCode}</span>
        </S.OrderInfo>
        <S.MailInfo>
          <S.MailInfoIcon>
            <ReactSVG path={mailSentSvg} />
          </S.MailInfoIcon>
          <S.MailInfoText>
            Recibirás en tu correo electrónico la confirmación y detalle de tu
            compra
          </S.MailInfoText>
        </S.MailInfo>
        </S.Wrapper> 
        <S.WrapperDescription>
          <CheckoutReview
            checkout={checkout}
            isShippingAvailable={data?.shop?.isShippingAvailable}
            shippingAddress={checkoutShippingAddress}
            billingAddress={checkoutBillingAddress}
            scheduleDate={checkout?.scheduleDate}
            shippingMethodName={checkout?.shippingMethod?.name}
            paymentMethodName={getPaymentMethodDescription()}
            email={checkout?.email}
            creditCardProvider={getCreditCardProvider()}
          />
          <CartResume
            onClickHandle={()=>{/**/}}
            activeStepIndex={0}
            promoPrice={promoTaxedPrice}
            subTotalPrice={subtotalPrice}
            shippingPrice={shippingTaxedPrice}
            totalPrice={totalPrice}
            totalProducts={totalProducts}
        />
        </S.WrapperDescription>
        <S.WrapperDescription>
        <S.Buttons>
          <S.SecondaryButton onClick={continueShopping}>
            Regresar al inicio
          </S.SecondaryButton>
        </S.Buttons>
        </S.WrapperDescription>
    </Container>
  );
};

export { ThankYou };
