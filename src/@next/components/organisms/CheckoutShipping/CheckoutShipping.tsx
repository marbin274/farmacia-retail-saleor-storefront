import { ErrorMessage } from "@components/atoms";
import { ShippingMethodItem } from "@components/molecules";
import { convertShippingMethodDateToDate } from "@temp/@next/utils/dateUtils";
import {
  launchCheckoutEvent,
  steps,
  ecommerceProductsMapper,
} from "@temp/@sdk/gaConfig";
import {
  IShippingMethodUpdate,
  IShippingMethodUpdateScheduleDate,
} from "@temp/@sdk/repository";
import { HOURS_FORMAT, SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from "date-fns";
import { useFormik } from "formik";
import React from "react";
import { ISlotScheduleDate } from "../../molecules/ShippingMethodItem/types";
import { shippingMethodFormSchema } from "./schema";
import * as S from "./styles";
import { ICheckoutShipping, IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  scheduleDate,
  selectShippingMethod,
  formId,
  formRef,
  items,
  selectedSlotId,
  slots,
}: IProps) => {
  const {
    errors: formikErrors,
    touched,
    values,
    handleSubmit,
    handleChange,
    setErrors,
    setFieldValue,
  } = useFormik<ICheckoutShipping>({
    enableReinitialize:true,
    initialValues: {
      dateSelected: !scheduleDate?.date
        ? undefined
        : convertShippingMethodDateToDate(scheduleDate.date),
      isScheduled:
        shippingMethods?.find(it => it.id === selectedShippingMethodId)
          ?.isScheduled || false,
      selectedScheduleTimeId: scheduleDate?.scheduleTime?.id || "",
      selectedSlotId: selectedSlotId || "",
      shippingMethod: selectedShippingMethodId,
    },
    onSubmit: values => {
      if (selectShippingMethod && values.shippingMethod) {
        if (!values.isScheduled) {
          selectShippingMethod(
            {
              shippingMethodId: values.shippingMethod,
              slotId: values.selectedSlotId,
            },
            false
          );
          return;
        } else if (
          values.isScheduled &&
          values.dateSelected &&
          values.selectedSlotId
        ) {
          const scheduleDate: IShippingMethodUpdateScheduleDate = {
            date: format(values.dateSelected, SHIPPING_FORMAT_DATE) || "",
            scheduleTimeId: values.selectedScheduleTimeId || "",
          };
          selectShippingMethod(
            {
              scheduleDate,
              shippingMethodId: values.shippingMethod,
              slotId: values.selectedSlotId,
            },
            false
          );
        }
      }
    },
    validationSchema: shippingMethodFormSchema,
  });

  const setShippingMethod = (value: IShippingMethodUpdate) => {
    if (selectShippingMethod) {
      selectShippingMethod(value, true);
    }
  };

  const renderGroupLabel = (title: string) => (
    <span className='fa-text-2xl fa-mb-6 fa-block'>
      {title}
    </span>
  );

  const handleOnclick = (
    id: string,
    isScheduled: boolean,
    scheduleDates: ISlotScheduleDate[] | null,
    selected: boolean,
    slotId?: string
  ) => {
    if (!selected) {
      launchCheckoutEvent(
        steps.shippingMethodSelected,
        ecommerceProductsMapper(items)
      );
      setFieldValue("shippingMethod", id);
      setFieldValue("isScheduled", isScheduled);
      setFieldValue("selectedSlotId", slotId);
      const shippingMethod: IShippingMethodUpdate = {
        shippingMethodId: id,
        slotId,
      };
      if (isScheduled) {
        const scheduleDate = scheduleDates?.[0];
        const scheduleTime = scheduleDate?.scheduleTimes?.[0];

        const date = convertShippingMethodDateToDate(scheduleTime?.date);
        const scheduleTimeId = scheduleTime?.scheduleTimeId;
        slotId = scheduleTime?.id;

        shippingMethod.scheduleDate = {
          date: scheduleTime?.date!,
          scheduleTimeId: scheduleTimeId || "",
        };
        shippingMethod.slotId = slotId;

        setFieldValue("dateSelected", date);
        setFieldValue("selectedSlotId", slotId);
        setFieldValue("selectedScheduleTimeId", scheduleTimeId);
      }
      setShippingMethod(shippingMethod);
    }
    setErrors({});
  };

  const renderExpressItem = () => {
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
          handleOnclick(id, false, null, selected, express.id);
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

  const renderScheduledItem = () => {
    const scheduled = slots?.scheduled;

    if (!scheduled?.length) {
      return;
    }

    const shippingMethod = shippingMethods?.find(x => !!x.isScheduled);

    if (!shippingMethod?.scheduleDates?.length) {      
      return null;
    }

    const { id, isScheduled, name, price, scheduleDates, subtitle } = shippingMethod;
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
          handleOnclick(id, true, slotScheduleDates, selected);
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
  }

  const renderForm = () => {
    if ((!slots?.express && !slots?.scheduled) || !shippingMethods?.length) {
      return null;
    }

    return (
      <form id={formId} ref={formRef} onSubmit={handleSubmit}>
        <div className='fa-grid fa-grid-cols-1 lg:fa-grid-cols-2 fa-gap-x-8 fa-relative'>
          {renderExpressItem()}
          {renderScheduledItem()}
        </div>
        {!!shippingMethods?.length &&
          formikErrors?.shippingMethod &&
          !values.shippingMethod && (
            <ErrorMessage
              errors={[{ message: formikErrors.shippingMethod }]}
            />
          )}
        </form>
    )
  }

  return (
    <section>
      <S.FieldsGroup>
        {renderGroupLabel("Escoge el tiempo de entrega")}
        {renderForm()}
      </S.FieldsGroup>
    </section>
  );
};

export { CheckoutShipping };
