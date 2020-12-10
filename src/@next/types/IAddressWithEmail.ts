import { IAddress } from ".";

export interface IAddressWithEmail extends IAddress {
  email?: string;
  dataTreatmentPolicy?: boolean;
  termsAndConditions?: boolean;
  documentNumber?: string;
}
