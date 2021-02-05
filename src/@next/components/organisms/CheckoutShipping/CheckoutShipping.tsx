import { Formik } from "formik";
import React from "react";

import { Radio } from "@components/atoms";
import { Money } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  selectShippingMethod,
  formId,
  formRef,
}: IProps) => {
  const renderGroupLabel = (id: number, title: string) => (
    <S.GroupLabel>
      <S.GroupLabelIndex>{id}</S.GroupLabelIndex>
      <S.GroupLabelTitle>{title}</S.GroupLabelTitle>
    </S.GroupLabel>
  );

  const setShippingMethod = (value: string | undefined) => {
    if (selectShippingMethod && value) {
      selectShippingMethod(value, true);
    }
  };

  return (
    <section>
      <Formik
        initialValues={{
          shippingMethod: selectedShippingMethodId,
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          if (selectShippingMethod && values.shippingMethod) {
            selectShippingMethod(values.shippingMethod, false);
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
          return (
            <S.FieldsGroup>
              {renderGroupLabel(3, "Escoge el tiempo de entrega")}
              <S.ShippingMethodForm
                id={formId}
                ref={formRef}
                onSubmit={handleSubmit}
              >
                {shippingMethods
                  .slice(0, 3)
                  .map(({ id, name, price }, index) => {
                    const checked =
                      !!values.shippingMethod && values.shippingMethod === id;

                    return (
                      <S.Tile checked={checked} key={id}>
                        <Radio
                          data-cy={`checkoutShippingMethodOption${index}Input`}
                          name="shippingMethod"
                          value={id}
                          checked={checked}
                          customLabel={true}
                          onChange={() => {
                            setFieldValue("shippingMethod", id);
                            setShippingMethod(id);
                          }}
                        >
                          <S.RadioContent>
                            <S.RadioName
                              data-cy={`checkoutShippingMethodOption${index}Name`}
                              checked={checked}
                            >
                              {name}
                            </S.RadioName>
                            <S.Price checked={checked}>
                              <Money
                                data-cy={`checkoutShippingMethodOption${index}Price`}
                                money={price}
                              />
                            </S.Price>
                          </S.RadioContent>
                        </Radio>
                      </S.Tile>
                    );
                  })}
                {/* <ErrorMessage errors={errors} /> */}
              </S.ShippingMethodForm>
            </S.FieldsGroup>
          );
        }}
      </Formik>
    </section>
  );
};

export { CheckoutShipping };
