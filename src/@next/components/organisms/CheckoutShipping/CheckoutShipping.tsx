import { ShippingMethodItem } from '@components/molecules';
import { convertShippingMethodDateToDate } from '@temp/@next/utils/dateUtils';
import { isScheduledShippingMethod } from '@temp/core/utils';
import React from 'react';
import { CheckoutShippingProgrammed } from '../CheckoutShippingProgrammed';
import { IScheduleDates } from '../CheckoutShippingProgrammed/types';
import * as S from './styles';
import { IProps } from './types';

const CheckoutShipping: React.FC<IProps> = ({
  fieldErrors,
  scheduleSelected,
  shippingMethods,
  values,
  registerEvent,
  setFieldValue,
  setScheduleTime,
  setValues,
  touched,
}: IProps) => {
  const handleSelectShippingMethod = (
    shippingMethodId: string,
    isScheduled: boolean,
    scheduleDates: Array<IScheduleDates | null> | null,
    selected: boolean,
    slotId: string
  ) => {
    if (!selected) {
      registerEvent();
      let deliveryDate: Date;
      let formScheduleDate: string;

      if (isScheduled && scheduleDates?.[0]) {
        const scheduleDate = scheduleDates?.[0];
        const date = convertShippingMethodDateToDate(scheduleDate?.date);
        deliveryDate = date;
        formScheduleDate = scheduleDate?.scheduleTimes?.[0]?.scheduleTimeId;
        slotId = scheduleDate?.scheduleTimes?.[0]?.slotId;
      }

      setValues({
        ...values,
        deliveryDate,
        isScheduled,
        scheduleDate: formScheduleDate,
        shippingMethod: shippingMethodId,
        slotId,
      });
    }
  };

  return (
    <>
      {shippingMethods?.map((shippingMethod, index) => {
        const {
          id: shippingMethodId,
          name,
          price,
          slotId,
          scheduleDates,
          subtitle,
        } = shippingMethod;
        const isScheduled = isScheduledShippingMethod(shippingMethod);
        const selected: boolean =
          !!values.shippingMethod && values.shippingMethod === shippingMethodId;
        return (
          <React.Fragment key={index}>
            <S.ShippingMethodContainer
              data-cy={`checkoutShippingMethodOption${index}Input`}
              hasError={
                touched.shippingMethod &&
                !!fieldErrors?.shippingMethod &&
                !values.shippingMethod
              }
              isScheduledSelected={!!selected && !!isScheduled}
              selected={selected}
              onClick={() =>
                handleSelectShippingMethod(
                  shippingMethodId,
                  !!isScheduled,
                  scheduleDates,
                  selected,
                  slotId
                )
              }
            >
              <div className="fa-flex fa-flex-col fa-w-full">
                <ShippingMethodItem
                  shippingMethodId={shippingMethodId}
                  price={price}
                  index={index}
                  isScheduled={isScheduled}
                  name={name}
                  selected={selected}
                  subtitle={subtitle}
                />
              </div>
            </S.ShippingMethodContainer>
            <CheckoutShippingProgrammed
              deliveryDate={values.deliveryDate}
              errors={fieldErrors}
              isScheduled={isScheduled}
              selected={selected}
              scheduleDates={scheduleDates}
              scheduleSelected={scheduleSelected}
              setFieldValue={setFieldValue}
              setScheduleTime={setScheduleTime}
              touched={touched}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export { CheckoutShipping };
