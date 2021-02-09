export interface IAlertServiceProps{
  buttonText: string;
  icon?: string;
  message?: string;
  title: string;
  redirectionLink?: string;
}

export interface IProps extends IAlertServiceProps {
  hide: () => void;
  show: boolean;
  svgIconUrl: string;
}
