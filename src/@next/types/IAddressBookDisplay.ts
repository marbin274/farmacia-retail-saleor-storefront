import { IAddressWithAddressType } from ".";

export interface IAddressBookDisplay {
    onEdit: () => void;
    onRemove: () => void;
    setDefault: (type: string) => void;
    removeDefault: () => void;
    address: IAddressWithAddressType;
  };
