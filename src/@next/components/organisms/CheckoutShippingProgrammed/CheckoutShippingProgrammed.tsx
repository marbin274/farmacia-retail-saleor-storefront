import { DatePicker } from '@components/atoms';
import { InputSelect } from '@components/molecules';
import {
  convertShippingMethodDateToDate,
  getScheduleTimesFormat,
} from '@temp/@next/utils/dateUtils';
import { SHIPPING_FORMAT_DATE } from '@temp/core/config';
import { format } from 'date-fns';
import { ClockIcon } from '@farmacia-retail/farmauna-components';
import React from 'react';
import * as S from './styles';
import {
  ICheckoutShippingProgrammedProps,
  IScheduledTimeOption,
} from './types';

export const CheckoutShippingProgrammed: React.FC<ICheckoutShippingProgrammedProps> =
  ({
    deliveryDate,
    errors,
    isScheduled,
    selected,
    scheduleSelected: scheduleDateId,
    scheduleDates,
    setFieldValue,
    setScheduleTime,
    touched,
  }) => {
    const scheduleTimes: IScheduledTimeOption[] = React.useMemo(() => {
      if (!deliveryDate || !scheduleDates || !scheduleDates.length) {
        return [];
      }
      const dateString = format(deliveryDate, SHIPPING_FORMAT_DATE);
      const scheduleDate = scheduleDates?.find((it) => it?.date === dateString);
      if (!scheduleDate || !scheduleDate.scheduleTimes) {
        return [];
      }
      return scheduleDate.scheduleTimes.map(
        (it): IScheduledTimeOption => ({
          description: getScheduleTimesFormat(it?.startTime, it?.endTime),
          id: it?.id,
          slotId: it.slotId,
          scheduleDate: it.scheduleTimeId,
        })
      );
    }, [deliveryDate, scheduleDates]);

    const minDate: Date | undefined = React.useMemo(() => {
      if (!scheduleDates) {
        return undefined;
      }
      const date = scheduleDates?.[0]?.date
        ? convertShippingMethodDateToDate(scheduleDates[0].date)
        : undefined;
      return date;
    }, [scheduleDates]);
    const maxDate: Date | undefined = React.useMemo(() => {
      if (!scheduleDates) {
        return undefined;
      }
      const date = scheduleDates?.[scheduleDates.length - 1]?.date
        ? convertShippingMethodDateToDate(
            scheduleDates[scheduleDates.length - 1].date
          )
        : undefined;
      return date;
    }, [scheduleDates]);

    const scheduleDate = React.useMemo(
      () => scheduleTimes?.find((it) => it.id === scheduleDateId),
      [scheduleDateId]
    );

    const handleOnChangescheduleDate = (value: IScheduledTimeOption) =>
      setScheduleTime(value);

    return selected && isScheduled ? (
      <S.ShippingMethodItemControl>
        <S.ShippingMethodScheduleControl>
          <span className="fa-text-gray-01 fa-text-sm fa-block fa-h-10">
            Escoge el día de entrega
          </span>
          <S.ShippingMethodControl>
            <DatePicker
              disabled={!minDate || !maxDate}
              name="deliveryDate"
              errors={
                touched.deliveryDate &&
                (errors?.deliveryDate
                  ? [
                      {
                        field: 'deliveryDate',
                        message: String(errors.deliveryDate),
                      },
                    ]
                  : undefined)
              }
              minDate={minDate}
              maxDate={maxDate}
              value={deliveryDate}
              onChange={(date: Date | [Date, Date] | null) => {
                setFieldValue('deliveryDate', date);
                setFieldValue('scheduleDate', undefined);
              }}
            />
          </S.ShippingMethodControl>
        </S.ShippingMethodScheduleControl>
        <S.ShippingMethodScheduleControl>
          <span className="fa-text-gray-01 fa-text-sm fa-block fa-h-10">
            Escoge el rango
          </span>
          <S.ShippingMethodControl>
            <InputSelect
              indicatorIcon={<ClockIcon size={16} />}
              inputProps={{
                'data-cy': 'addressFormCity',
                placeholder: '',
              }}
              label=""
              name="scheduleDate"
              options={scheduleTimes}
              value={scheduleDate || ''}
              onChange={handleOnChangescheduleDate}
              optionLabelKey="description"
              optionValueKey="id"
              errors={
                touched.scheduleDate &&
                (errors?.scheduleDate
                  ? [
                      {
                        field: 'scheduleDate',
                        message: errors.scheduleDate,
                      },
                    ]
                  : undefined)
              }
            />
          </S.ShippingMethodControl>
        </S.ShippingMethodScheduleControl>
      </S.ShippingMethodItemControl>
    ) : null;
  };
