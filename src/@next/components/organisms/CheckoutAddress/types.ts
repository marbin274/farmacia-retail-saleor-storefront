import { ICheckout, IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { GetShop_shop_availableDistricts, GetShop_shop_countries } from "@temp/@sdk/queries/gqlTypes/GetShop";
import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import {
  IAddress,
  IAddressWithAddressType,
  IAddressWithEmail,
  IFormError,
} from "@types";

export declare type Address = {
  id: string;
  address: IAddressWithAddressType;
};

export interface IProps {
  userAddresses?: Address[] | null;
  selectedUserAddressId?: string;
  checkoutAddress?: IAddress | null;
  email?: string;
  checkoutData?: ICheckout;
  countries?: Array<GetShop_shop_countries | null>;
  user?: UserDetails_me | null;
  formRef?: React.RefObject<HTMLFormElement>;
  formId?: string;
  newAddressFormId?: string;
  errors?: IFormError[];
  setShippingAddress: (
    address?: IAddress,
    email?: string,
    id?: string,
    privacyPolicy?: IPrivacyPolicy,
    documentNumber?: string
  ) => void;
  setFormValue?: (address?: IAddressWithEmail) => void;
  availableDistricts: (GetShop_shop_availableDistricts | null)[];
}
