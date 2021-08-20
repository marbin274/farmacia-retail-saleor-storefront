import { CreateCheckout_checkoutCreate_checkout_shippingAddress } from '@sdk/mutations/gqlTypes/CreateCheckout';

export type AddressInterface = Omit<
  CreateCheckout_checkoutCreate_checkout_shippingAddress,
  '__typename'
>;

export interface IIGeoJsonGeometry {
  type: string;
  coordinates: number[][][];
}

export interface IGeoJsonFeature {
  type: string;
  geometry: IIGeoJsonGeometry;
  bbox?: number[];
  properties?: any;
}

export interface IGeoJson {
  type: string;
  features: IGeoJsonFeature[];
}
