import { ShippingMethodItem } from "@temp/@next/components/molecules";
import React, { FC } from "react";
import * as S from "../../styles";
import { ISlotShippingMethodItem } from "../../types";

export const ExpressShippingMethod: FC<ISlotShippingMethodItem> = ({
  formikErrors,
  handleChange,
  onClick,
  shippingMethods,
  setErrors,
  setFieldValue,
  slots,
  setShippingMethod,
  touched,
  values,
}) => {
  const express = slots?.express?.[0];

  if (!express) {
    return null;
  }

  const shippingMethod = shippingMethods?.find(x => !x.isScheduled);

  if (!shippingMethod) {
    return null;
  }

  const { id, isScheduled, name, price, subtitle } = shippingMethod;
  const selected = values?.shippingMethod === id;
  const index = 0;

  return (
    <S.ShippingMethodContainer
      data-cy={`checkoutShippingMethodOption${index}Input`}
      hasError={!!formikErrors?.shippingMethod && !values.shippingMethod}
      selected={selected}
      isScheduledSelected={!!selected && !!isScheduled}
      onClick={() => {
        onClick(id, false, null, selected, express.id);
      }}
    >
      <S.ShippingMethodItem>
        <ShippingMethodItem
          dateSelected={values.dateSelected}
          errors={formikErrors}
          id={id}
          index={index}
          isScheduled={false}
          name={name}
          selected={selected}
          selectedSlotId={values.selectedSlotId}
          subtitle={subtitle}
          touched={touched}
          price={price}
          handleChange={handleChange}
          setErrors={setErrors}
          setFieldValue={setFieldValue}
          setShippingMethod={setShippingMethod}
        />
      </S.ShippingMethodItem>
    </S.ShippingMethodContainer>
  );
};
