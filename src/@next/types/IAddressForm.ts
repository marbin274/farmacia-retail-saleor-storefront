export interface IAddressForm {
  dataTreatmentPolicy: boolean | null;
  deliveryDate?: Date;
  district: string;
  documentNumber: string;
  email: string;
  firstName: string;
  isLastMileActive: boolean;
  isScheduled: boolean | null;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  scheduleDate?: string;
  slotId?: string;
  shippingMethod?: string;
  streetAddress1: string;
  streetAddress2?: string;
  termsAndConditions: boolean;
}
