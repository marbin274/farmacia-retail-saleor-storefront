import { IGeoJson } from '@temp/core/types/address';

export type IMapFieldProps = {
  addressName: string;
  geoJsonBounds?: IGeoJson;
  latName?: string;
  lngName?: string;
  onChangeLocation?: (
    location: google.maps.LatLngLiteral,
    address: string
  ) => void;
};
