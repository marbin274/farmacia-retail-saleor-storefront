import { ErrorMessage } from "@components/atoms";
import { ShippingMethodItem } from "@components/molecules";
import { convertShippingMethodDateToDate } from "@temp/@next/utils/dateUtils";
import { Checkout_availableShippingMethods_scheduleDates } from "@temp/@sdk/fragments/gqlTypes/Checkout";
import {
  launchCheckoutEvent,
  steps,
  ecommerceProductsMapper,
} from "@temp/@sdk/gaConfig";
import {
  IShippingMethodUpdate,
  IShippingMethodUpdateScheduleDate,
} from "@temp/@sdk/repository";
import { SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from "date-fns";
import { useFormik } from "formik";
import React from "react";
import { CheckoutShippingProgrammed } from "../CheckoutShippingProgrammed";
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
}: IProps) => {
  const {
    errors: formikErrors,
    values,
    handleSubmit,
    setErrors,
    setFieldValue,
  } = useFormik<ICheckoutShipping>({
    enableReinitialize: true,
    initialValues: {
      dateSelected: !scheduleDate?.date
        ? undefined
        : convertShippingMethodDateToDate(scheduleDate.date),
      isScheduled:
        shippingMethods?.find(it => it.id === selectedShippingMethodId)
          ?.isScheduled || false,
      scheduleSelected: scheduleDate?.scheduleTime?.id,
      shippingMethod: selectedShippingMethodId,
    },
    onSubmit: values => {
      if (selectShippingMethod && values.shippingMethod) {
        if (!values.isScheduled) {
          selectShippingMethod(
            {
              shippingMethodId: values.shippingMethod,
            },
            false
          );
          return;
        } else if (
          values.isScheduled &&
          values.dateSelected &&
          values.scheduleSelected
        ) {
          const scheduleDate: IShippingMethodUpdateScheduleDate = {
            date: format(values.dateSelected, SHIPPING_FORMAT_DATE) || "",
            scheduleTimeId: values.scheduleSelected || "",
          };
          selectShippingMethod(
            {
              scheduleDate,
              shippingMethodId: values.shippingMethod,
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
    <span className="fa-text-2xl fa-mb-6 fa-block">{title}</span>
  );

  const handleOnclick = (
    id: string,
    isScheduled: boolean,
    scheduleDates: Array<Checkout_availableShippingMethods_scheduleDates | null> | null,
    selected: boolean
  ) => {
    if (!selected) {
      launchCheckoutEvent(
        steps.shippingMethodSelected,
        ecommerceProductsMapper(items)
      );
      setFieldValue("shippingMethod", id);
      setFieldValue("isScheduled", isScheduled);
      const shippingMethod: IShippingMethodUpdate = { shippingMethodId: id };
      if (isScheduled) {
        const scheduleDate = scheduleDates?.[0];
        const date = convertShippingMethodDateToDate(scheduleDate?.date);
        shippingMethod.scheduleDate = {
          date: scheduleDate?.date,
          scheduleTimeId: scheduleDate?.scheduleTimes?.[0]?.id || "",
        };
        setFieldValue("dateSelected", date);
        setFieldValue("scheduleSelected", scheduleDate?.scheduleTimes?.[0]?.id);
      }
      setShippingMethod(shippingMethod);
    }
    setErrors({});
  };

  return (
    <section>
      <S.FieldsGroup>
        {renderGroupLabel("Escoge el tiempo de entrega")}
        <form id={formId} ref={formRef} onSubmit={handleSubmit}>
          <div className="fa-grid fa-grid-cols-1 lg:fa-grid-cols-2 fa-gap-x-8 fa-relative">
            {shippingMethods?.map(
              (
                { id, isScheduled, name, price, scheduleDates, subtitle },
                index
              ) => {
                const selected: boolean =
                  !!values.shippingMethod && values.shippingMethod === id;
                  
                return (
                  <React.Fragment key={index}>
                    <S.ShippingMethodContainer
                      data-cy={`checkoutShippingMethodOption${index}Input`}
                      hasError={
                        !!formikErrors?.shippingMethod && !values.shippingMethod
                      }
                      isScheduledSelected={!!selected && !!isScheduled}
                      selected={selected}
                      onClick={() => {
                        handleOnclick(
                          id,
                          !!isScheduled,
                          scheduleDates,
                          selected
                        );
                      }}
                    >
                      <S.ShippingMethodItem>
                        <ShippingMethodItem
                          id={id}
                          price={price}
                          index={index}
                          isScheduled={isScheduled}
                          name={name}
                          selected={selected}
                          subtitle={subtitle}
                        />
                      </S.ShippingMethodItem>
                    </S.ShippingMethodContainer>
                    <CheckoutShippingProgrammed
                      dateSelected={values.dateSelected}
                      errors={formikErrors}
                      id={id}
                      isScheduled={isScheduled}
                      selected={selected}
                      scheduleSelected={values.scheduleSelected}
                      scheduleDates={scheduleDates}
                      setFieldValue={setFieldValue}
                      setShippingMethod={setShippingMethod}
                    />
                  </React.Fragment>
                );
              }
            )}
          </div>
          {!!shippingMethods?.length &&
            formikErrors?.shippingMethod &&
            !values.shippingMethod && (
              <ErrorMessage
                errors={[{ message: formikErrors.shippingMethod }]}
              />
            )}
        </form>
      </S.FieldsGroup>
    </section>
  );
};

export { CheckoutShipping };
