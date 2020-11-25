import { IAddressWithAddressType } from "@types";

export interface IProps {
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  checked?: boolean;
  address: IAddressWithAddressType;
  inputName: string;
}
