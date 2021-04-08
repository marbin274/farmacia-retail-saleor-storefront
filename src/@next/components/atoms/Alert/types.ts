import ErrorIcon from "images/auna/wrong.svg";
export type AlertType = "Error" | "Info";
export interface IAlertServiceProps {
  buttonText: string;
  icon?: string;
  message?: string;
  title?: string;
  type: AlertType;
  redirectionLink?: string;
  acceptDialog?: ()=> void;
}
export interface IProps extends IAlertServiceProps {
  hide: () => void;
  show: boolean;
  svgIconUrl: string;
}

export interface IAlertTypes {
  icon: string;
  title: string;
}

export const alertTypes: { Error: IAlertTypes; Info: IAlertTypes } = {
  Error: {
    icon: ErrorIcon,
    title: "Uy, algo salió mal",
  },
  Info: {
    icon: ErrorIcon,
    title: "Uy, algo salió mal",
  },
};
