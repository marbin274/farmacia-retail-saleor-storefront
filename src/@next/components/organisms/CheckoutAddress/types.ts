import { IPrivacyPolicy } from "@temp/@sdk/api/Checkout/types";
import { GetShop_shop_countries } from "@temp/@sdk/queries/gqlTypes/GetShop";
import { IAddress, IAddressWithAddressType, IFormError } from "@types";

export declare type Address = {
  id: string;
  address: IAddressWithAddressType;
};

export interface IProps {
  userAddresses?: Address[] | null;
  selectedUserAddressId?: string;
  checkoutAddress?: IAddress | null;
  email?: string;
  documentNumber?: string;
  termsAndConditions?: boolean;
  dataTreatmentPolicy?: boolean;
  countries?: Array<GetShop_shop_countries | null>;
  user?: any;
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
}
