import { ICheckout, IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import { IAddressWithEmail, IFormError } from "@types";

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
}

export type AddressError = { field?: string; message: string };

export interface IProps {
  user?: UserDetails_me | null;
  userLoading?: boolean,
  address?: IAddressWithEmail;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  districtsOptions?: string[];
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: IFormError[];
  checkoutData?: ICheckout;
  handleSubmit?: (
    address?: IAddressWithEmail,
    email?: string,
    id?: string,
    privacyPolicy?: IPrivacyPolicy,
    documentNumber?: string
  ) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  includeEmail?: boolean;
  comeFromModal?: boolean;
  isValid?: boolean;
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
