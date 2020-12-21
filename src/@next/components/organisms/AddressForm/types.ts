import { ICheckout, IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { IAddressWithEmail } from "@types";

export interface IFormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue: (field: string, value: string | boolean) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
  values?: IAddressWithEmail;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  includeEmail?: boolean;
  citiesOptions?: string[];
  user: any;
  formikErrors?: any;
}

export type AddressError = { field?: string; message: string };

export interface IProps {
  user?: any;
  address?: IAddressWithEmail;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  citiesOptions?: string[];
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any[];
  checkoutData?: ICheckout;
  handleSubmit?: (formData: IAddressWithEmail | undefined) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  includeEmail?: boolean;
  comeFromModal?: boolean;
  touched?: any;
  isValid?: boolean;
  validateForm?: any;
  onSelect?: (
    address?: IAddressWithEmail,
    email?: string,
    id?: string,
    privacyPolicy?: IPrivacyPolicy,
    documentNumber?: string
  ) => void;

  setFormValue?: (address?: IAddressWithEmail) => void;
}

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
