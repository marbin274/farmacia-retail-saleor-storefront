import { IAddress } from ".";

export interface IAddressWithEmail extends IAddress {
  email?: string;
  dataTreatmentPolicy?: boolean | null;
  termsAndConditions?: boolean;
  documentNumber?: string;
}
