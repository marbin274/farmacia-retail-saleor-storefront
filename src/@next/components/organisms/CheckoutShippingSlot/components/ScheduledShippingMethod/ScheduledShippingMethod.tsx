import { ShippingMethodItem } from '@temp/@next/components/molecules';
import { ISlotScheduleDate } from '@components/organisms/CheckoutShippingProgrammed/types';
import React, { FC } from 'react';
import { format } from 'date-fns';
import { HOURS_FORMAT, SHIPPING_FORMAT_DATE } from '@temp/core/config';
import * as S from '../../styles';
import { ISlotShippingMethodItem } from '../../types';
import { CheckoutShippingProgrammedSlot } from '../../../CheckoutShippingProgrammed';
import { isScheduledShippingMethod } from '@temp/core/utils';

export const ScheduledShippingMethod: FC<ISlotShippingMethodItem> = ({
  formikErrors,
  onClick,
  shippingMethods,
  setFieldValue,
  slots,
  setShippingMethod,
  values,
}) => {
  const scheduled = slots?.scheduled;

  if (!scheduled?.length) {
    return null;
  }

  const shippingMethod = shippingMethods?.find((x) =>
    isScheduledShippingMethod(x)
  );

  if (!shippingMethod?.scheduleDates?.length) {
    return null;
  }

  const { id, name, price, scheduleDates, subtitle } = shippingMethod;
  const selected = values?.shippingMethod === id;
  const index = 1;

  const defaultScheduleDate = scheduleDates?.[0];
  const defaultScheduleTime = defaultScheduleDate?.scheduleTimes?.[0];

  const slotScheduleDates: ISlotScheduleDate[] = [
    {
      scheduleTimes: scheduled!.map((x) => ({
        date: format(new Date(x.slotFrom!), SHIPPING_FORMAT_DATE),
        id: x.id!,
        startTime: format(new Date(x.slotFrom!), HOURS_FORMAT),
        endTime: format(new Date(x.slotTo!), HOURS_FORMAT),
        scheduleTimeId: defaultScheduleTime?.id!,
      })),
    },
  ];

  return (
    <>
      <S.ShippingMethodContainer
        data-cy={`checkoutShippingMethodOption${index}Input`}
        hasError={!!formikErrors?.shippingMethod && !values.shippingMethod}
        selected={selected}
        isScheduledSelected={!!selected}
        onClick={() => {
          onClick(id, true, slotScheduleDates, selected);
        }}
      >
        <S.ShippingMethodItem>
          <ShippingMethodItem
            id={id}
            index={index}
            isScheduled={true}
            name={name}
            selected={selected}
            subtitle={subtitle}
            price={price}
          />
        </S.ShippingMethodItem>
      </S.ShippingMethodContainer>
      <CheckoutShippingProgrammedSlot
        dateSelected={values.dateSelected}
        errors={formikErrors}
        id={id}
        isScheduled={true}
        selected={selected}
        selectedSlotId={values.selectedSlotId}
        scheduleDates={slotScheduleDates}
        setFieldValue={setFieldValue!}
        setShippingMethod={setShippingMethod!}
        scheduleTimeId={values.selectedScheduleTimeId}
      />
    </>
  );
};
