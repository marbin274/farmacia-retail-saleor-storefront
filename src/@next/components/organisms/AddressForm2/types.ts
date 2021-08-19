import { GetShop_shop_availableDistricts } from '@temp/@sdk/queries/gqlTypes/GetShop';

export type IAddressForm = {
  city?: GetShop_shop_availableDistricts;
  latitude?: string;
  longitude?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  alias?: string;
};

export type IAddressForm2Props = {
  onSubmit: (values: IAddressForm) => void;
};
