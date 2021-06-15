import { DatePicker, Radio } from "@components/atoms";
import { Money } from "@components/containers";
import { InputSelect } from "@components/molecules";
import {
  convertShippingMethodDateToDate,
  getScheduleTimesFormat,
} from "@temp/@next/utils/dateUtils";
import { SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from "date-fns";
import { Chip, ClockIcon } from "@farmacia-retail/farmauna-components";
import React from "react";
import * as S from "./styles";
import { IKeyValue, IProps } from "./types";

export const ShippingMethodItem: React.FC<IProps> = ({
    dateSelected,
    id,
    errors,
    index,
    isScheduled,
    name,
    selected,
    scheduleTimeId,
    selectedSlotId,
    scheduleDates,
    subtitle,
    price,
    setFieldValue,
    setShippingMethod,
}) => {
    const scheduleTimes:IKeyValue[] = React.useMemo(()=>{
      if (!dateSelected || !scheduleDates || !scheduleDates.length) { return [] };
      const scheduleTimes = scheduleDates?.[0]?.scheduleTimes;
      if(!scheduleTimes?.length) { return [] };

      const dateString = format(dateSelected, SHIPPING_FORMAT_DATE); 
      const result = scheduleTimes?.filter(it => it?.date === dateString);
      if(!result?.length){
          return [];
      }
      return result.map(it => ({id: it?.id, description: getScheduleTimesFormat(it?.startTime, it?.endTime)}));
    },[dateSelected, scheduleDates]);

    const minDate: Date | undefined = React.useMemo(()=>{
        const scheduleTimes = scheduleDates?.[0]?.scheduleTimes;
        if(!scheduleTimes){ return undefined};
        const date = convertShippingMethodDateToDate(scheduleTimes?.[0]?.date);
        return date;
    },[scheduleDates]);

    const maxDate: Date | undefined = React.useMemo(()=>{
        const scheduleTimes = scheduleDates?.[0]?.scheduleTimes;
        if(!scheduleTimes){ return undefined};
        const date = convertShippingMethodDateToDate(scheduleTimes?.[scheduleTimes.length - 1]?.date);
        return date;
    },[scheduleDates]);

    const slotSelected = React.useMemo(()=>(
      scheduleTimes
      ?.find(it => it.id === selectedSlotId)
    ), [selectedSlotId]);

    const handleOnChangeScheduleSelected = (value: IKeyValue) => {
        setFieldValue("selectedSlotId", value.id);
        setFieldValue("selectedScheduleTimeId", scheduleTimeId!);
        if (id && dateSelected && value.id) {
            setShippingMethod({
                scheduleDate: { date: format(dateSelected, SHIPPING_FORMAT_DATE), scheduleTimeId: scheduleTimeId! },
                shippingMethodId: id,
                slotId: value.id,
            });
        }
    }

  return (
    <>
      <S.ShippingMethodItem>
        <Radio
          readOnly
          data-cy={`checkoutShippingMethodOption${index}Input`}
          name="shippingMethod"
          value={id}
          checked={selected}
        ></Radio>
        <div className="fa-flex fa-flex-col fa-w-full">
          <S.ShippingMethodText>
            <S.ShippingMethodTitle
              data-cy={`checkoutShippingMethodOption${index}Name`}
              selected={selected}
            >
              {isScheduled ? name : "Delivery programado"}
            </S.ShippingMethodTitle>
            <S.ShippingMethodSubTitle selected={selected}>
              {isScheduled
                ? "Escoge la fecha y la hora"
                : "75 minutos aproximadamente"}
            </S.ShippingMethodSubTitle>
          </S.ShippingMethodText>
          <Chip
            disabled={!selected}
            style={{
              display: "block",
              width: "4.25rem",
              textAlign: "center",
            }}
            label={
              <Money
                data-cy={`checkoutShippingMethodOption${index}Price`}
                money={price}
              />
            }
          />
        </div>
      </S.ShippingMethodItem>
      {selected && isScheduled && (
        <S.ShippingMethodItemControl>
          <S.ShippingMethodScheduleControl>
            <span className="fa-text-gray-01 fa-text-sm">
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
                  setFieldValue("selectedSlotId", "");
                }}
              />
            </S.ShippingMethodControl>
          </S.ShippingMethodScheduleControl>
          <S.ShippingMethodScheduleControl>
            <span className="fa-text-gray-01 fa-text-sm">Escoge el rango</span>
            <S.ShippingMethodControl>
              <InputSelect
                indicatorIcon={<ClockIcon size={16} />}
                inputProps={{
                  "data-cy": "addressFormCity",
                  placeholder: "",
                }}
                label=""
                name="selectedSlotId"
                options={scheduleTimes}
                value={slotSelected || ""}
                onChange={handleOnChangeScheduleSelected}
                optionLabelKey="description"
                optionValueKey="id"
                errors={
                  errors?.selectedSlotId
                    ? [
                        {
                          field: "selectedSlotId",
                          message: errors.selectedSlotId,
                        },
                      ]
                    : undefined
                }
              />
            </S.ShippingMethodControl>
          </S.ShippingMethodScheduleControl>
        </S.ShippingMethodItemControl>
      )}
    </>
  );
};
