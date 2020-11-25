import { IAddressWithEmail } from "@types";

export interface IFormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue: (field: string, value: string) => void;
  values?: IAddressWithEmail;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  includeEmail?: boolean;
  citiesOptions?: string[];
}

export type AddressError = { field?: string; message: string };

export interface IProps {
  address?: IAddressWithEmail;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  citiesOptions?: string[];
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any;
  handleSubmit?: (formData: IAddressWithEmail | undefined) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  includeEmail?: boolean;
  onSelect?: (address?: IAddressWithEmail, email?: string) => void;
}

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
