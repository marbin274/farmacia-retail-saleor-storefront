export interface IDiscountFormData {
  giftCards?: any[];
  promoCode?: any;
  voucherType?: string | null,
  voucherDiscountType?: string | null,
  voucherDiscountValue?: number | undefined,
}

export interface IProps {
  discount?: IDiscountFormData;
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any;
  removeVoucher?:(text: string) => void;
  addPromoCode?:(formData: IDiscountFormData | undefined) => void;
  handleSubmit?: (formData: IDiscountFormData | undefined) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setShowLabelCupon: (show: boolean) => void;
  setReRenderNiubiz: (flag: boolean) => void;

}
