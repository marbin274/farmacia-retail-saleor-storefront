import { IAddressAutocompleteProps } from '..';

export type IAddressAutocompleteFieldProps = {
  latName?: string;
  lngName?: string;
  keepCoordinatesOnChange?: boolean;
} & IAddressAutocompleteProps;
