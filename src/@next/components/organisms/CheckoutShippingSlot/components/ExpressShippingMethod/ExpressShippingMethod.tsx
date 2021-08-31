import { ShippingMethodItem } from '@temp/@next/components/molecules';
import { isExpressShippingMethod } from '@temp/core/utils';
import React, { FC } from 'react';
import * as S from '../../styles';
import { ISlotShippingMethodItem } from '../../types';

export const ExpressShippingMethod: FC<ISlotShippingMethodItem> = ({
  formikErrors,
  onClick,
  shippingMethods,
  slots,
  values,
}) => {
  const express = slots?.express?.[0];

  if (!express) {
    return null;
  }

  const shippingMethod = shippingMethods?.find((x) =>
    isExpressShippingMethod(x)
  );

  if (!shippingMethod) {
    return null;
  }

  const { id, name, price, subtitle } = shippingMethod;
  const selected = values?.shippingMethod === id;
  const index = 0;

  return (
    <S.ShippingMethodContainer
      data-cy={`checkoutShippingMethodOption${index}Input`}
      hasError={!!formikErrors?.shippingMethod && !values.shippingMethod}
      selected={selected}
      isScheduledSelected={false}
      onClick={() => {
        onClick(id, false, null, selected, express.id);
      }}
    >
      <S.ShippingMethodItem>
        <ShippingMethodItem
          id={id}
          index={index}
          isScheduled={false}
          name={name}
          selected={selected}
          subtitle={subtitle}
          price={price}
        />
      </S.ShippingMethodItem>
    </S.ShippingMethodContainer>
  );
};
