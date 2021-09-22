import { Button, InputField } from '@farmacia-retail/farmauna-components';
import { Formik } from 'formik';
import React from 'react';
import { ReactSVG } from 'react-svg';
import * as S from './styles';
import { IProps } from './types';

export const DiscountForm: React.FC<IProps> = ({
  handleSubmit,
  discount,
  errors,
  addPromoCode,
  removeVoucher,
  formId,
  formRef,
  setReRenderNiubiz,
}: IProps) => {
  const promoCode = discount && discount.promoCode;

  const [inputCode, setInputCode] = React.useState('');
  const [tempPromoCode, setTempPromoCode] = React.useState(promoCode);

  const handleApplyBtnClick = (newInputCode: string) => {
    if (addPromoCode) {
      addPromoCode({
        giftCards: undefined,
        promoCode: newInputCode,
      });
    }

    setInputCode('');
  };

  const handleRemoveBtnClick = async (newInputCode: string) => {
    setTempPromoCode(undefined);
    setInputCode('');
    if (removeVoucher) {
      setReRenderNiubiz(false);
      await removeVoucher(newInputCode);
      setReRenderNiubiz(true);
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
      {({ handleSubmit, values, setFieldValue }) => {
        let discountDescription = '';
        let discountValue = <span></span>;
        if (discount?.voucherType === 'shipping') {
          discountDescription = 'Delivery gratis en esta compra';
        } else {
          if (discount?.voucherDiscountType === 'fixed') {
            discountValue = <span>S/ {discount?.voucherDiscountValue}</span>;
            discountDescription = ' de descuento en toda tu compra';
          } else {
            discountValue = <span>{discount?.voucherDiscountValue}%</span>;
            discountDescription = ' de descuento en toda tu compra';
          }
        }

        return (
          <S.DiscountForm id={formId} ref={formRef} onSubmit={handleSubmit}>
            {!discount?.promoCode && (
              <S.InputWithButton>
                <S.InputWrapper className="wrapper">
                  <InputField
                    data-cy="checkoutPaymentPromoCodeInput"
                    label="Ingresa tu cupón"
                    name="inputCode"
                    inputSize="large"
                    placeholder="Ejem: YEPS-03JD-N08T"
                    value={values?.inputCode}
                    onChange={(e) => {
                      const value = e.currentTarget?.value?.toUpperCase();
                      setFieldValue('inputCode', value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'enter') {
                        e.preventDefault();
                        handleApplyBtnClick(values.inputCode);
                      }
                    }}
                    onFocus={() => {
                      errors = null;
                    }}
                  />
                </S.InputWrapper>

                <Button
                  type="button"
                  variant="outline"
                  size="large"
                  data-cy="checkoutPaymentPromoCodeBtn"
                  onClick={() => handleApplyBtnClick(values.inputCode)}
                >
                  Aplicar
                </Button>
              </S.InputWithButton>
            )}
            {discount?.promoCode && (
              <S.ChipsWrapper className="promoCode">
                <div className="voucherTitle">
                  <ReactSVG src="/assets/auna/checkout-cupon-small.svg" />

                  <span data-cy="checkoutPaymentPromoCodeChip">
                    {discount?.promoCode}
                  </span>
                </div>
                <div className="voucherDescription">
                  {discountValue}
                  {discountDescription}
                </div>
                <S.LinkWrapper
                  onClick={() => handleRemoveBtnClick(discount?.promoCode)}
                >
                  Eliminar
                </S.LinkWrapper>
              </S.ChipsWrapper>
            )}
          </S.DiscountForm>
        );
      }}
    </Formik>
  );
};
