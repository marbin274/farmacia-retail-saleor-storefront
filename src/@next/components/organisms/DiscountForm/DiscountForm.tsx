import { Formik } from "formik";
import React from "react";

import { Button, Chip, ErrorMessage, Input } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";
import ReactSVG from "react-svg";
import voucherSVG from '../../../../images/auna/voucher.svg';

export const DiscountForm: React.FC<IProps> = ({
  handleSubmit,
  discount,
  errors,
  addPromoCode,
  removeVoucher,
  formId,
  formRef,
}: IProps) => {
  const promoCode = discount && discount.promoCode;

  const [inputCode, setInputCode] = React.useState("");
  const [tempPromoCode, setTempPromoCode] = React.useState(promoCode);

  const handleApplyBtnClick = (newInputCode: string) => {
    if (addPromoCode) {
      addPromoCode({
        giftCards: undefined,
        promoCode: newInputCode,
      });
    }
    
    setInputCode("");
  };


  const handleRemoveBtnClick = (newInputCode: string) => {
    setTempPromoCode(undefined);
    setInputCode("");
    if(removeVoucher) {
      removeVoucher(newInputCode);
    }
  };

  return (
    <Formik
      initialValues={{
        errors: [],
        inputCode,
        tempPromoCode,
      }}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        if (handleSubmit) {
          handleSubmit({
            promoCode: values.inputCode,
          });
        }
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        const hasErrors = !!(values.errors && values.errors.length);

        let discountDescription = "";

        if (discount?.voucherType === "shipping") {
          discountDescription = "Delivery gratis en esta compra";
        } else {
          if (discount?.voucherDiscountType === "fixed") {
            discountDescription = discount?.voucherDiscountValue + "S/ de descuento en toda tu compra";
          } else {
            discountDescription = discount?.voucherDiscountValue + "% de descuento en toda tu compra";
          }
        }

        return (
          <S.DiscountForm id={formId} ref={formRef} onSubmit={handleSubmit}>
            <S.Input >
              <S.InputWithButton>
              {(!discount?.promoCode) && (
                  <S.InputWrapper>
                    <div id="flex" className={
                          (errors && errors.length) ? 'error' : 'flex'
                        }>
                      <div className="input">
                          <Input 
                            data-cy="checkoutPaymentPromoCodeInput"
                            error={hasErrors}
                            name="inputCode"
                            value={values.inputCode}
                            label=""
                            placeholder="Inserta tu código"
                            onChange={handleChange}
                            onFocus={() => {errors = null}}
                          />
                        </div>
                        <div className="button">
                          <Button
                            type="button"
                            data-cy="checkoutPaymentPromoCodeBtn"
                            onClick={() => handleApplyBtnClick(values.inputCode)}
                          >
                            Aplicar
                          </Button>
                        </div>
                    </div>
                  </S.InputWrapper>

              )}

              </S.InputWithButton>
            </S.Input>
            {(discount?.promoCode) && (
              <div>
                <S.ChipsWrapper className="promoCode">
                  <Chip onClose={() => handleRemoveBtnClick(discount?.promoCode)}>
                    <div className="voucherTitle">
                      <ReactSVG
                          path={voucherSVG}
                        /> 
                      <span data-cy="checkoutPaymentPromoCodeChip">
                        {discount?.promoCode}
                      </span>
                    </div>
                    <div className="voucherDescription">
                      {discountDescription}
                    </div>

                  </Chip>
                </S.ChipsWrapper>
              </div>
            )}

            <div style={{marginLeft: "1rem"}}>
              <ErrorMessage errors={errors} />
            </div>
            
          </S.DiscountForm>
          
        );
      }}
    </Formik>
  );
};