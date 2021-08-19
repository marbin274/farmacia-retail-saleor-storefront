import { IAddressWithEmail } from '@types';

export interface IProps {
  hideModal: () => void;
  title?: string;
  address?: {
    address: IAddressWithEmail;
    id: string;
  };
  show?: boolean;
}
