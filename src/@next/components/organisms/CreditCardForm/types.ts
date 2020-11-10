import {
  CardError,
  ICardErrors,
  ICardInputs,
} from "src/core/payments/braintree";

interface ILabelsText {
  ccCsc: string;
  ccExp: string;
  ccName?: string;
  ccNumber: string;
  ccSurname?: string;
}
export interface IFormikProps {
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  values: ICardInputs;
}

export interface IProps {
  additionalFields?:  { name: boolean, surname: boolean};
  formRef?: React.RefObject<HTMLFormElement>;
  formId?: string;
  cardErrors: ICardErrors;
  labelsText: ILabelsText;
  placeholders?: ILabelsText;
  handleSubmit: (formData: ICardInputs) => void;
  disabled: boolean;
}

export type CardErrors = CardError[] | null[];

export interface ICustomInputProps {
  errors: CardErrors;
  label: string;
}

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
