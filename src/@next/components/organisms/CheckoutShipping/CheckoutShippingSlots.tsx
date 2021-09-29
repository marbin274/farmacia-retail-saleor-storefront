import { IAddressForm } from '@temp/@next/types/IAddressForm';
import {
  CountryCode,
  ShippingMethodTypeCode,
} from '@temp/@sdk/gqlTypes/globalTypes';
import {
  GetPotentialShippingMethods_potentialShippingMethods,
  GetPotentialShippingMethods_potentialShippingMethods_scheduleDates,
} from '@temp/@sdk/queries/gqlTypes/GetPotentialShippingMethods';
import { GetPotentialSlots_potentialSlots } from '@temp/@sdk/queries/gqlTypes/GetPotentialSlots';
import { usePotentialSlots } from '@temp/@sdk/react';
import { HOURS_FORMAT, SHIPPING_FORMAT_DATE } from '@temp/core/config';
import { format } from 'date-fns';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { IScheduleDates } from '../CheckoutShippingProgrammed/types';
import { IPotentialShippingMethod } from './types';

export interface ICheckoutShippingSlotsProps {
  children?: (
    shippingMethods: IPotentialShippingMethod[],
    loading: boolean
  ) => React.ReactNode;
  items: {
    quantity: number;
    variantId: string;
  }[];
  shippingMethods: GetPotentialShippingMethods_potentialShippingMethods[];
  values: IAddressForm;
}

const getSlotsScheduleDates = (
  potentialSlots: GetPotentialSlots_potentialSlots,
  scheduleDates: GetPotentialShippingMethods_potentialShippingMethods_scheduleDates[]
): IScheduleDates[] => {
  const dates: IScheduleDates[] = [];

  potentialSlots?.scheduled?.forEach((it) => {
    const newDate = format(new Date(it.slotFrom!), SHIPPING_FORMAT_DATE);
    let date = dates.find((it) => it.date === newDate);
    if (!date) {
      date = {
        date: newDate,
        scheduleTimes: [],
        __typename: 'ScheduleByDate',
      };
      dates.push(date);
    }
    date.scheduleTimes.push({
      __typename: 'ScheduleTime',
      endTime: format(new Date(it.slotTo), HOURS_FORMAT),
      id: it.id,
      slotId: it.id,
      scheduleTimeId: scheduleDates?.[0]?.scheduleTimes?.[0].id,
      startTime: format(new Date(it.slotFrom), HOURS_FORMAT),
    });
  });

  return dates;
};

export const CheckoutShippingSlots: React.FC<ICheckoutShippingSlotsProps> = ({
  children,
  items,
  shippingMethods,
  values,
}) => {
  const [sessionId] = React.useState<string>(uuid());
  const { data: potentialSlots, loading } = usePotentialSlots(
    {
      lines: items,
      sessionId,
      shippingAddress: {
        district: values.district,
        latitude: values.latitude,
        longitude: values.longitude,
        country: CountryCode.PE,
      },
    },
    { fetchPolicy: 'network-only' }
  );

  const shippingMethodsSlots: IPotentialShippingMethod[] = React.useMemo(
    () =>
      shippingMethods
        .map((shippingMethod) => {
          let slotId: string;
          let scheduleDates = [];

          switch (shippingMethod.methodType.code) {
            case ShippingMethodTypeCode.EXPRESS:
            case ShippingMethodTypeCode.EXPRESS_PRIME:
              slotId = potentialSlots?.express?.[0]?.id;
              break;
            case ShippingMethodTypeCode.EXPRESS_NEXT_DAY:
              slotId = potentialSlots?.nextDay?.[0]?.id;
              break;
            case ShippingMethodTypeCode.EXPRESS_30:
              slotId = potentialSlots?.express30?.[0]?.id;
              break;
            case ShippingMethodTypeCode.SCHEDULED:
            case ShippingMethodTypeCode.SCHEDULED_PRIME:
              scheduleDates = getSlotsScheduleDates(
                potentialSlots,
                shippingMethod.scheduleDates
              );
              break;
          }

          return {
            ...shippingMethod,
            slotId,
            scheduleDates,
          };
        })
        .filter(
          ({ slotId, scheduleDates }) =>
            slotId?.length || (!slotId?.length && scheduleDates.length)
        ),
    [shippingMethods, potentialSlots]
  );

  return <>{children(shippingMethodsSlots, loading)}</>;
};
