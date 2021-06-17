import { CheckoutProgressBar } from "@components/molecules";
import { CheckoutReview } from "@components/organisms";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { Container } from "@components/templates";
import { Button, MailIcon } from "@farmacia-retail/farmauna-components";
import React from "react";
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
    <S.WrapperThankyou>
      <S.WrapperProgressBar>
        <CheckoutProgressBar
          steps={steps}
          activeStepIndex={2}
          pathName={"/checkout/review"}
        />
      </S.WrapperProgressBar>
      <Container>
        <S.Wrapper>
          <S.ThankYouHeader>
            <span>¡Gracias!</span>
            <span>Recibimos tu orden!</span>
          </S.ThankYouHeader>
          <S.OrderInfo>
            El código de tu orden es: <span>{sequentialCode}</span>
          </S.OrderInfo>
          <S.MailInfo>
            <S.MailInfoIcon>
              <MailIcon size={32} />
            </S.MailInfoIcon>
            <S.MailInfoText>
              Recibirás en tu correo electrónico la confirmación y detalle de tu
              compra
            </S.MailInfoText>
          </S.MailInfo>
          <Button variant="outline" size="large" onClick={continueShopping}>
            Regresar al inicio
          </Button>
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
        </S.WrapperDescription>
      </Container>
    </S.WrapperThankyou>
  );
};

export { ThankYou };
