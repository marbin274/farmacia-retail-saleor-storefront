import { GetShop_shop_availableDistricts } from '@temp/@sdk/queries/gqlTypes/GetShop';
import { UserDetails_me_addresses } from '@temp/@sdk/queries/gqlTypes/UserDetails';

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
  address?: UserDetails_me_addresses;
  onSubmit: (values: IAddressForm) => void;
  show?: boolean;
}
