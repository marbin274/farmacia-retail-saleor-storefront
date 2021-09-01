import { ErrorMessage } from '@components/atoms';
import { convertShippingMethodDateToDate } from '@temp/@next/utils/dateUtils';
import {
  launchCheckoutEvent,
  steps,
  ecommerceProductsMapper,
} from '@temp/@sdk/gaConfig';
import {
  IShippingMethodUpdate,
  IShippingMethodUpdateScheduleDate,
} from '@temp/@sdk/repository';
import { SHIPPING_FORMAT_DATE } from '@temp/core/config';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import React from 'react';
import { shippingMethodSlotFormSchema } from './schema';
import * as S from './styles';
import { ICheckoutShippingSlotForm, ICheckoutShippingSlotProps } from './types';
import { ExpressShippingMethod, ScheduledShippingMethod } from './components';
import { ISlotScheduleDate } from '@components/organisms/CheckoutShippingProgrammed/types';
import { isScheduledShippingMethod } from '@temp/core/utils';

/**
 * Shipping method selector used in checkout with instaleap integration.
 */
export const CheckoutShippingSlot: React.FC<ICheckoutShippingSlotProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  scheduleDate,
  selectShippingMethod,
  formId,
  formRef,
  items,
  selectedSlotId,
  slots,
}) => {
  const {
    errors: formikErrors,
    values,
    handleSubmit,
    setErrors,
    setFieldValue,
  } = useFormik<ICheckoutShippingSlotForm>({
    enableReinitialize: true,
    initialValues: {
      dateSelected: !scheduleDate?.date
        ? undefined
        : convertShippingMethodDateToDate(scheduleDate.date),
      isScheduled: isScheduledShippingMethod(
        shippingMethods?.find((it) => it.id === selectedShippingMethodId)
      ),
      selectedScheduleTimeId: scheduleDate?.scheduleTime?.id || '',
      selectedSlotId: selectedSlotId || '',
      shippingMethod: selectedShippingMethodId,
    },
    onSubmit: (values) => {
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
            date: format(values.dateSelected, SHIPPING_FORMAT_DATE) || '',
            scheduleTimeId: values.selectedScheduleTimeId || '',
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
    validationSchema: shippingMethodSlotFormSchema,
  });

  const setShippingMethod = (value: IShippingMethodUpdate) => {
    if (selectShippingMethod) {
      selectShippingMethod(value, true);
    }
  };

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
      setFieldValue('shippingMethod', id);
      setFieldValue('isScheduled', isScheduled);
      setFieldValue('selectedSlotId', slotId);
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
          scheduleTimeId: scheduleTimeId || '',
        };
        shippingMethod.slotId = slotId;

        setFieldValue('dateSelected', date);
        setFieldValue('selectedSlotId', slotId);
        setFieldValue('selectedScheduleTimeId', scheduleTimeId);
      }
      setShippingMethod(shippingMethod);
    }
    setErrors({});
  };

  const renderForm = () => {
    if ((!slots?.express && !slots?.scheduled) || !shippingMethods?.length) {
      return null;
    }

    return (
      <form id={formId} ref={formRef} onSubmit={handleSubmit}>
        <div className="fa-grid fa-grid-cols-1 lg:fa-grid-cols-2 fa-gap-x-8 fa-relative">
          <ExpressShippingMethod
            slots={slots}
            shippingMethods={shippingMethods}
            formikErrors={formikErrors}
            values={values}
            onClick={handleOnclick}
          />
          <ScheduledShippingMethod
            slots={slots}
            shippingMethods={shippingMethods}
            formikErrors={formikErrors}
            values={values}
            setFieldValue={setFieldValue}
            setShippingMethod={setShippingMethod}
            onClick={handleOnclick}
          />
        </div>
        {!!shippingMethods?.length &&
          formikErrors?.shippingMethod &&
          !values.shippingMethod && (
            <ErrorMessage errors={[{ message: formikErrors.shippingMethod }]} />
          )}
      </form>
    );
  };

  return (
    <section>
      <S.FieldsGroup>
        <span className="fa-text-2xl fa-mb-6 fa-block">
          Escoge el tiempo de entrega
        </span>
        {renderForm()}
      </S.FieldsGroup>
    </section>
  );
};
