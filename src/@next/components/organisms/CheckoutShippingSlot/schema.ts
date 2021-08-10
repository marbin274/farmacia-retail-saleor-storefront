import {
  SHIPPING_METHOD_DATE_INVALID,
  SHIPPING_METHOD_REQUIRED,
  SHIPPING_METHOD_SCHEDULE_INVALID,
} from "@temp/@next/utils/schemasMessages";
import * as yup from "yup";

export const shippingMethodSlotFormSchema = yup
  .object()
  .shape({
    dateSelected: yup.date().when("isScheduled", {
      is: (value: boolean | null) => value === true,
      then: yup
        .date()
        .typeError(SHIPPING_METHOD_DATE_INVALID)
        .required(SHIPPING_METHOD_DATE_INVALID),
    }),
    isScheduled: yup
      .boolean()
      .nullable()
      .required(),
    selectedSlotId: yup.string().when("isScheduled", {
      is: (value: boolean | null) => value === true,
      then: yup.string().required(SHIPPING_METHOD_SCHEDULE_INVALID),
    }),
    shippingMethod: yup.string().required(SHIPPING_METHOD_REQUIRED),
  })
  .defined();
