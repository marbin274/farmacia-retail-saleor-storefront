import * as SchemaValidation from '@temp/@next/utils/schemas';
import {
  SHIPPING_METHOD_DATE_INVALID,
  SHIPPING_METHOD_REQUIRED,
  SHIPPING_METHOD_SCHEDULE_INVALID,
} from '@temp/@next/utils/schemasMessages';
import * as yup from 'yup';

export const DISTRITO_REQUIRED = 'Selecciona el distrito de entrega';
export const STREET_ADDRESS_1_REQUIRED =
  'Escribe tu dirección y elige una de las opciones desplegadas';
export const COORDINATES_REQUIRED =
  'Elige una de las direcciones desplegadas o indica tu ubicación en el mapa';

export const addressFormSchema = yup.object({
  dataTreatmentPolicy: SchemaValidation.dataTreatmentPolicyValidation,
  deliveryDate: yup
    .date()
    .notRequired()
    .when('isScheduled', {
      is: (value: boolean | null) => value === true,
      then: yup
        .date()
        .typeError(SHIPPING_METHOD_DATE_INVALID)
        .required(SHIPPING_METHOD_DATE_INVALID)
        .defined(),
    }),
  district: yup.string().required(DISTRITO_REQUIRED).defined(DISTRITO_REQUIRED),
  documentNumber: SchemaValidation.documentNumberValidation,
  email: SchemaValidation.emailValidation,
  firstName: SchemaValidation.fullNameValidation,
  isLastMileActive: yup.boolean(),
  isScheduled: yup.boolean().nullable().required(),
  latitude: yup
    .number()
    .nullable()
    .when('streetAddress1', {
      is: (value: string | null) => value?.length,
      then: yup
        .number()
        .nullable()
        .required(COORDINATES_REQUIRED)
        .defined(COORDINATES_REQUIRED),
    }),
  longitude: yup.number().nullable(),
  phone: SchemaValidation.phoneValidation,
  slotId: yup
    .string()
    .nullable()
    .when('isLastMileActive', {
      is: (value: boolean | null) => value === true,
      then: yup.string().required(SHIPPING_METHOD_SCHEDULE_INVALID),
    }),
  streetAddress1: yup
    .string()
    .trim()
    .required(STREET_ADDRESS_1_REQUIRED)
    .defined(),
  streetAddress2: yup.string().trim(),
  scheduleDate: yup.string().when(['isScheduled', 'isLastMileActive'], {
    is: (isScheduled: boolean | null, isLastMileActive: boolean) =>
      isScheduled === true && !isLastMileActive,
    then: yup.string().required(SHIPPING_METHOD_SCHEDULE_INVALID),
  }),
  shippingMethod: yup.string().when(['district', 'latitude'], {
    is: (district: string | null, latitude: number | null) =>
      district?.length && !!latitude,
    then: yup.string().required(SHIPPING_METHOD_REQUIRED),
    otherwise: yup
      .string()
      .required(
        'Selecciona un distrito y un lugar en el mapa para mostrar los métodos de envío'
      ),
  }),
  termsAndConditions: SchemaValidation.termsAndConditionsValidation,
});
