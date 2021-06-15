import { ShippingMethodItem } from "@temp/@next/components/molecules";
import { ISlotScheduleDate } from "@temp/@next/components/molecules/ShippingMethodItem/types";
import React, { FC } from "react";
import { format } from "date-fns";
import { HOURS_FORMAT, SHIPPING_FORMAT_DATE } from "@temp/core/config";
import * as S from "../../styles";
import { ISlotShippingMethodItem } from "../../types";

export const ScheduledShippingMethod: FC<ISlotShippingMethodItem> = ({
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
  const scheduled = slots?.scheduled;

  if (!scheduled?.length) {
    return null;
  }

  const shippingMethod = shippingMethods?.find(x => !!x.isScheduled);

  if (!shippingMethod?.scheduleDates?.length) {
    return null;
  }

  const {
    id,
    isScheduled,
    name,
    price,
    scheduleDates,
    subtitle,
  } = shippingMethod;
  const selected = values?.shippingMethod === id;
  const index = 1;

  const defaultScheduleDate = scheduleDates?.[0];
  const defaultScheduleTime = defaultScheduleDate?.scheduleTimes?.[0];

  const slotScheduleDates: ISlotScheduleDate[] = [
    {
      scheduleTimes: scheduled!.map(x => ({
        date: format(new Date(x.slotFrom!), SHIPPING_FORMAT_DATE),
        id: x.id!,
        startTime: format(new Date(x.slotFrom!), HOURS_FORMAT),
        endTime: format(new Date(x.slotTo!), HOURS_FORMAT),
        scheduleTimeId: defaultScheduleTime?.id!,
      })),
    },
  ];

  return (
    <S.ShippingMethodContainer
      data-cy={`checkoutShippingMethodOption${index}Input`}
      hasError={!!formikErrors?.shippingMethod && !values.shippingMethod}
      selected={selected}
      isScheduledSelected={!!selected && !!isScheduled}
      onClick={() => {
        onClick(id, true, slotScheduleDates, selected);
      }}
    >
      <S.ShippingMethodItem>
        <ShippingMethodItem
          dateSelected={values.dateSelected}
          errors={formikErrors}
          id={id}
          index={index}
          isScheduled={true}
          name={name}
          selected={selected}
          selectedSlotId={values.selectedSlotId}
          scheduleDates={slotScheduleDates}
          subtitle={subtitle}
          touched={touched}
          price={price}
          handleChange={handleChange}
          setErrors={setErrors}
          setFieldValue={setFieldValue}
          setShippingMethod={setShippingMethod}
          scheduleTimeId={defaultScheduleTime?.id}
        />
      </S.ShippingMethodItem>
    </S.ShippingMethodContainer>
  );
};
