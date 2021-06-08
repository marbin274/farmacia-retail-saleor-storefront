import { DatePicker, Radio } from "@components/atoms";
import { Money } from "@components/containers";
import { InputSelect } from "@components/molecules";
import { convertShippingMethodDateToDate, getScheduleTimesFormat } from "@temp/@next/utils/dateUtils";
import { SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from 'date-fns';
import shippingMethodClockIcon from "images/auna/shipping-method-clock.svg";
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
        const dateString = format(dateSelected, SHIPPING_FORMAT_DATE);
        const scheduleDate = scheduleDates?.find(it => it?.date === dateString);
        if(!scheduleDate || !scheduleDate.scheduleTimes){
            return [];
        }
        return scheduleDate.scheduleTimes.map(it => ({id: it?.id, description: getScheduleTimesFormat(it?.startTime, it?.endTime)}));
    },[dateSelected, scheduleDates]);

    const minDate: Date | undefined = React.useMemo(()=>{
        if(!scheduleDates){ return undefined};
        const date = convertShippingMethodDateToDate(scheduleDates?.[0]?.date);
        return date;
    },[scheduleDates]);
    const maxDate: Date | undefined = React.useMemo(()=>{
        if(!scheduleDates){ return undefined};
        const date = convertShippingMethodDateToDate(scheduleDates?.[scheduleDates.length - 1]?.date);
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
          <S.ShippingMethodText>
            <S.ShippingMethodTitle
              data-cy={`checkoutShippingMethodOption${index}Name`}
              selected={selected}
            >
              {name}
            </S.ShippingMethodTitle>
            <S.ShippingMethodSubTitle selected={selected}>
              {isScheduled ? "Escoge la fecha y la hora de entrega" : subtitle}
            </S.ShippingMethodSubTitle>
          </S.ShippingMethodText>
          <S.ShippingMethodPrice selected={selected}>
            <Money
              data-cy={`checkoutShippingMethodOption${index}Price`}
              money={price}
            />
          </S.ShippingMethodPrice>
        </S.ShippingMethodItem>
        {selected && isScheduled && (
          <S.ShippingMethodItemControl>
            <S.ShippingMethodScheduleControl>
              <S.ShippingMethodLabel>
                Escoge el día de entrega
              </S.ShippingMethodLabel>
              <S.ShippingMethodControl>
                <DatePicker
                  name="dateSelected"
                  errors={
                    errors?.dateSelected
                      ? [
                          {
                            field: "dateSelected",
                            message: errors.dateSelected,
                          },
                        ]
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
              <S.ShippingMethodLabel>Escoge el rango</S.ShippingMethodLabel>
              <S.ShippingMethodControl>
                <InputSelect
                  indicatorIcon={shippingMethodClockIcon}
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
}

