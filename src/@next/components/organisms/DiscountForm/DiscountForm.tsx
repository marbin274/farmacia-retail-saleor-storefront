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
  removeVoucher,
  formId,
  formRef,
}: IProps) => {
  const promoCode = discount && discount.promoCode;

  const [inputCode, setInputCode] = React.useState("");
  const [tempPromoCode, setTempPromoCode] = React.useState(promoCode);

  const handleApplyBtnClick = (newInputCode: string) => {
    setTempPromoCode(newInputCode);
    setInputCode("");
  };


  const handleRemoveBtnClick = (newInputCode: string) => {
    setTempPromoCode(undefined);
    setInputCode(newInputCode);
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
      enableReinitialize={true}
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
                            onKeyUp={() => {errors = null}}
                          />
                        </div>
                        <div className="button">
                          <Button
                            type="submit"
                            data-cy="checkoutPaymentPromoCodeBtn"
                            onClick={() => handleApplyBtnClick(values.tempPromoCode)}
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
                      5% de descuento en toda tu compra 
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