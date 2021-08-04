export interface IProps {
  cancelBtnText?: string;
  children: React.ReactNode;
  contentNoSpacing?: boolean;
  disabled: boolean;
  formId?: string;
  hide: () => void;
  onSubmit?: () => void;
  show: boolean;
  submitBtnText?: string;
  target?: HTMLElement | null;
  title?: string;
}
