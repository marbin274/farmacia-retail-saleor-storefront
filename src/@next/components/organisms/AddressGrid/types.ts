import { IAddressBookDisplay } from "@types";
export interface IProps {
  addresses: IAddressBookDisplay[];
  addNewAddress: () => void;
}
