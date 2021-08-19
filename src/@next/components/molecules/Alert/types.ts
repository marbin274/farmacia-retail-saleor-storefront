export type IAlertProps = {
  className?: string;
  icon?: JSX.Element;
  message: string;
  type?: 'error' | 'info' | 'success';
};
