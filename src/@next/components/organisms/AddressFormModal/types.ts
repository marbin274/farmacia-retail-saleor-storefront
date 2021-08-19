import { GetShop_shop_availableDistricts } from '@temp/@sdk/queries/gqlTypes/GetShop';
import { IAddressWithEmail } from '@types';

export type IAddressForm = {
  city?: GetShop_shop_availableDistricts;
  latitude?: string;
  longitude?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  alias?: string;
};

export interface IAddressFormModalProps {
  hideModal: () => void;
  title?: string;
  address?: IAddressWithEmail;
  onSubmit: (values: IAddressForm) => void;
  show?: boolean;
}
