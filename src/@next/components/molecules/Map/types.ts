import { IGeoJson } from '@temp/core/types/address';

export type IMapProps = {
  geoJson?: IGeoJson;
  hasError?: boolean;
  location?: google.maps.LatLngLiteral;
  onChangeLocation?: (
    location: google.maps.LatLngLiteral,
    address: string
  ) => void;
};
