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

const gateway = 'mirumee.payments.dummy';
const dummyToken = 'charged';

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

const AunaPaymentGateway: React.FC<IProps> = ({
   config,
   processPayment,
   formRef,
   formId,
   errors = [],
   onError,
 }: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);


  // @ts-ignore
  const clientToken = config.find(({ field }) => field === "client_token")
    ?.value;

  const [cardErrors/*, setCardErrors*/] = React.useState<ErrorData>(
    INITIAL_CARD_ERROR_STATE
  );

  const handleSubmit = async (formData: ICardInputs) => {
    setSubmitErrors([]);

    const creditCard: ICardPaymentInput = {
      billingAddress: {},
      cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    };

    // at the moment use this token, until use real payment plugin
    processPayment(gateway, dummyToken, creditCard);
    // processPayment(gateway, clientToken, creditCard);
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <S.Wrapper>
      <CreditCardForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccCsc: "CVC",
          ccExp: "ExpiryDate",
          ccNumber: "Number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
    </S.Wrapper>
  );
};

export { AunaPaymentGateway };
