export type AlertType = 'Error' | 'Info' | 'Text';
export interface IAlertServiceProps {
  buttonText: string;
  icon?: string;
  message?: string | JSX.Element | null;
  title?: string;
  type: AlertType;
  redirectionLink?: string;
  acceptDialog?: () => void;
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

export const alertTypes: {
  Error: IAlertTypes;
  Info: IAlertTypes;
  Text: IAlertTypes;
} = {
  Error: {
    icon: '/assets/wrong.svg',
    title: 'Uy, algo salió mal',
  },
  Info: {
    icon: '/assets/wrong.svg',
    title: 'Uy, algo salió mal',
  },
  Text: {
    icon: '',
    title: 'Uy, algo salió mal',
  },
};
