import { IFormError } from "@app/types";
import { FormikErrors, FormikTouched } from "formik";

export const joinFormikErrorsToIFormErrors = (formikErrors: FormikErrors<any>, iformError: IFormError[], touched: FormikTouched<any>, showErrors?: boolean): IFormError[] => {
  const errors: IFormError[] = iformError && showErrors ? [...iformError] : [];
  for (const property of Object.keys(formikErrors)) {
    const _err: IFormError = {
      field: property,
      message: formikErrors[property] as string,
    };
    const indexRemoveMessage = errors.findIndex(error => error.field === property);
    if (!showErrors && indexRemoveMessage !== -1) {
      errors.splice(indexRemoveMessage, 1);
    }
    if (touched.hasOwnProperty(property)) {
      errors.push(_err);
    }
  }
  return errors;
}

export const convertIFormErrorsToObjectErrors = (iformError: IFormError[]) => {
  const errors: any = {};
  if (iformError && iformError.length) {
    iformError.map(
      ({ field, message }: IFormError) => {
        if (field) {
          errors[field] = errors[field]
            ? [...errors[field], { message }]
            : [{ message }];
        }
      });
  }
  return errors;
}

export const joinFormikErrorsToIFormErrorsAndConvertToObjectErrors = (formikErrors: FormikErrors<any>, iformError: IFormError[], touched: FormikTouched<any>, showErrors?: boolean) => {
  const errorsArray: IFormError[] = joinFormikErrorsToIFormErrors(formikErrors, iformError, touched, showErrors);
  return convertIFormErrorsToObjectErrors(errorsArray);
}
