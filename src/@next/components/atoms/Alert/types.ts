export interface IProps {
  title: string;
  message?: string;
  hide: () => void;
  show: boolean;
  redirectionLink?: string;
  svgIconUrl: string;
  buttonText: string;
}
