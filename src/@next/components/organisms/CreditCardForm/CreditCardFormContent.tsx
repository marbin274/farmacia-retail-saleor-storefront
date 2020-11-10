import { compact } from "lodash";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";

import { Input } from "@components/atoms";
import { TextField } from "@components/molecules";
import * as S from "./styles";
import { CardErrors, PropsWithFormik } from "./types";

const getInputProps = (
  disabled: boolean,
  handleChange: (e: React.ChangeEvent) => void
) => (label: string, errors: CardErrors, value: string) => ({
  customInput: TextField,
  disabled,
  errors: compact(errors),
  label,
  onChange: handleChange,
  value,
});

export const CreditCardFormContent: React.FC<PropsWithFormik> = ({
  additionalFields,
  formRef,
  formId,
  cardErrors: {
    number: cardNumberError,
    cvv: ccCscError,
    expirationMonth: expirationMonthError,
    expirationYear: expirationYearError,
  },
  disabled,
  labelsText: { ccCsc: ccCscText, ccExp: ccExpText, ccName: ccNameText , ccNumber: ccNumberText,  ccSurname: ccSurnameText},
  placeholders,
  handleSubmit,
  handleChange,
  values,
}: PropsWithFormik) => {
  const basicInputProps = useCallback(getInputProps(disabled, handleChange), [
    disabled,
    handleChange,
  ]);

  let inputNumber = 1;

  const setFocus = () => {
    let result = false;
    if (inputNumber === 1){
      result = true;
      inputNumber++;
    }
    
    return result;
  }
  return (
    <S.PaymentForm ref={formRef} id={formId} onSubmit={handleSubmit}>
      {additionalFields?.name && (
        <S.PaymentInput>
          <Input
            autoFocus={setFocus()}
            name="ccName"
            placeholder={placeholders && placeholders.ccName}
            {...basicInputProps(ccNameText ? ccNameText : '', [cardNumberError], values.ccName as string)}
          />
        </S.PaymentInput>
      )}

      {additionalFields?.surname && (
        <S.PaymentInput>
          <Input
            autoFocus={setFocus()}
            name="ccSurname"
            placeholder={placeholders && placeholders.ccSurname}
            {...basicInputProps(ccSurnameText ? ccSurnameText : '', [cardNumberError], values.ccSurname as string)}
          />
        </S.PaymentInput>
      )}

      <S.PaymentInput>
        <NumberFormat
          autoFocus={setFocus()}
          autoComplete="cc-number"
          format="#### #### #### ####"
          name="ccNumber"
          placeholder={placeholders && placeholders.ccNumber}
          {...basicInputProps(ccNumberText, [cardNumberError], values.ccNumber)}
        />
      </S.PaymentInput>

      <S.Grid>
        <S.PaymentInputExp>
          <NumberFormat
            autoComplete="cc-exp"
            format="## / ##"
            name="ccExp"
            placeholder={placeholders && placeholders.ccExp}
            {...basicInputProps(
              ccExpText,
              [expirationMonthError, expirationYearError],
              values.ccExp
            )}
          />
        </S.PaymentInputExp>

        <S.PaymentInputCsc>
          <NumberFormat
            autoComplete="cc-csc"
            format="###"
            name="ccCsc"
            placeholder={placeholders && placeholders.ccCsc}
            {...basicInputProps(ccCscText, [ccCscError], values.ccCsc)}
          />
        </S.PaymentInputCsc>
      </S.Grid>
    </S.PaymentForm>
  );
};
