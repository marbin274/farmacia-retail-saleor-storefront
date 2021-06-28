import { DatePicker } from "@components/atoms";
import { InputSelect } from "@components/molecules";
import {
  convertShippingMethodDateToDate,
  getScheduleTimesFormat,
} from "@temp/@next/utils/dateUtils";
import { SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from "date-fns";
import { ClockIcon } from "@farmacia-retail/farmauna-components";
import React from "react";
import * as S from "./styles";
import { IKeyValue, IProps } from "./types";

export const CheckoutShippingProgrammed: React.FC<IProps> = ({
  dateSelected,
  id,
  errors,
  isScheduled,
  selected,
  scheduleSelected: scheduleSelectedId,
  scheduleDates,
  setFieldValue,
  setShippingMethod,
}) => {
  const scheduleTimes: IKeyValue[] = React.useMemo(() => {
    if (!dateSelected || !scheduleDates || !scheduleDates.length) {
      return [];
    }
    const dateString = format(dateSelected, SHIPPING_FORMAT_DATE);
    const scheduleDate = scheduleDates?.find(it => it?.date === dateString);
    if (!scheduleDate || !scheduleDate.scheduleTimes) {
      return [];
    }
    return scheduleDate.scheduleTimes.map(it => ({
      id: it?.id,
      description: getScheduleTimesFormat(it?.startTime, it?.endTime),
    }));
  }, [dateSelected, scheduleDates]);

  const minDate: Date | undefined = React.useMemo(() => {
    if (!scheduleDates) {
      return undefined;
    }
    const date = convertShippingMethodDateToDate(scheduleDates?.[0]?.date);
    return date;
  }, [scheduleDates]);
  const maxDate: Date | undefined = React.useMemo(() => {
    if (!scheduleDates) {
      return undefined;
    }
    const date = convertShippingMethodDateToDate(
      scheduleDates?.[scheduleDates.length - 1]?.date
    );
    return date;
  }, [scheduleDates]);

  const scheduleSelected = React.useMemo(
    () => scheduleTimes?.find(it => it.id === scheduleSelectedId),
    [scheduleSelectedId]
  );

  const handleOnChangeScheduleSelected = (value: IKeyValue) => {
    setFieldValue("scheduleSelected", value.id);
    if (id && dateSelected && value.id) {
      setShippingMethod({
        scheduleDate: {
          date: format(dateSelected, SHIPPING_FORMAT_DATE),
          scheduleTimeId: value.id,
        },
        shippingMethodId: id,
      });
    }
  };

  return (
    (selected && isScheduled) ? (
        <S.ShippingMethodItemControl>
          <S.ShippingMethodScheduleControl>
            <span className="fa-text-gray-01 fa-text-sm fa-block fa-h-10">
              Escoge el día de entrega
            </span>
            <S.ShippingMethodControl>
              <DatePicker
                name="dateSelected"
                errors={
                  errors?.dateSelected
                    ? [{ field: "dateSelected", message: errors.dateSelected }]
                    : undefined
                }
                minDate={minDate}
                maxDate={maxDate}
                value={dateSelected}
                onChange={(date: Date | [Date, Date] | null) => {
                  setFieldValue("dateSelected", date);
                  setFieldValue("scheduleSelected", "");
                }}
              />
            </S.ShippingMethodControl>
          </S.ShippingMethodScheduleControl>
          <S.ShippingMethodScheduleControl>
            <span className="fa-text-gray-01 fa-text-sm fa-block fa-h-10">Escoge el rango</span>
            <S.ShippingMethodControl>
              <InputSelect
                indicatorIcon={<ClockIcon size={16} />}
                inputProps={{
                  "data-cy": "addressFormCity",
                  placeholder: "",
                }}
                label=""
                name="scheduleSelected"
                options={scheduleTimes}
                value={scheduleSelected || ""}
                onChange={handleOnChangeScheduleSelected}
                optionLabelKey="description"
                optionValueKey="id"
                errors={
                  errors?.scheduleSelected
                    ? [
                        {
                          field: "scheduleSelected",
                          message: errors.scheduleSelected,
                        },
                      ]
                    : undefined
                }
              />
            </S.ShippingMethodControl>
          </S.ShippingMethodScheduleControl>
        </S.ShippingMethodItemControl>
    ) : null
  );
};
