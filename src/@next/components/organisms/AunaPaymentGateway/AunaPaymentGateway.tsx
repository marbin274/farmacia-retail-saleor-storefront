import React, { useState } from "react";

import { ErrorMessage } from "@components/atoms";
import { CreditCardForm } from "@components/organisms";

import { IFormError } from "@types";

import {
  ErrorData,
  ICardInputs,
  ICardPaymentInput,
  // IPaymentCardError,
  // PaymentData,
} from "@temp/core/payments/braintree";
import { maybe, removeEmptySpaces } from "@temp/core/utils";

import * as S from "./styles";
import { IProps } from "./types";
import ReactSVG from "react-svg";

// TODO: temporary constants
const gateway = 'mirumee.payments.dummy';
const dummyToken = 'charged';

const inputLabels = {
    ccCsc: "CVV",
    ccExp: "Fecha de vencimiento",
    ccName: "Nombre",
    ccNumber: "Número de tarjeta",
    ccSurname: "Apellido",
};

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    name: null,
    number: null,
    surname: null,
  },
  nonFieldError: "",
};


const AunaPaymentGateway: React.FC<IProps> = ({
   config,
   processPayment,
   formRef,
   formId,
   errors = [],
 }: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const [cardErrors] = React.useState<ErrorData>(
    INITIAL_CARD_ERROR_STATE
  );

  const handleSubmit = async (formData: ICardInputs) => {
    setSubmitErrors([]);

    const creditCard: ICardPaymentInput = {
      billingAddress: {},
      cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      name: removeEmptySpaces(maybe(() => formData.ccName, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
      surname: removeEmptySpaces(maybe(() => formData.ccSurname, "") || ""),
    };

    // TODO: at the moment use this token, until use real payment plugin
    processPayment(gateway, dummyToken, creditCard);
    // processPayment(gateway, clientToken, creditCard);
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <S.Wrapper>
      <CreditCardForm
        additionalFields = {{name: true, surname: true}}
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={inputLabels}
        placeholders={inputLabels}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
      <S.PoweredBy>
        <span>powered by:</span> <ReactSVG path={S.paymentGatewayLogo}/>
      </S.PoweredBy>
    </S.Wrapper>
  );
};

export { AunaPaymentGateway };
