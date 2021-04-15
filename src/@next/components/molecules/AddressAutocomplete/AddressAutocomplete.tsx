import React, { FC, useCallback, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { TextField } from "@components/molecules";
import { IProps as ITextFieldProps } from "@components/molecules/TextField/types";
import { mapsApiKey } from "@temp/constants";
import { LIMA_BOUNDS } from "@temp/core/config";

export type IAddressAutocompleteValue = {
  text?: string;
  lat?: number;
  lng?: number;
};

type IProps = {
  value?: IAddressAutocompleteValue;
  onChangeValue?: (value: IAddressAutocompleteValue) => void;
};

type IAddressAutocompleteProps = IProps & Omit<ITextFieldProps, "value">;

export const AddressAutocomplete: FC<IAddressAutocompleteProps> = ({
  onChangeValue,
  value,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google?.maps) {
      init();
      return;
    }

    new Loader({
      apiKey: mapsApiKey!,
      libraries: ["places"],
      version: "weekly",
    })
      .load()
      .then(() => {
        init();
      });
  }, []);

  const init = useCallback(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current!,
      {
        bounds: LIMA_BOUNDS,
        componentRestrictions: { country: ["pe"] },
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry?.location) {
        return;
      }

      onChangeValue?.({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        text: inputRef.current?.value,
      });
    });
  }, []);

  return (
    <TextField
      {...props}
      value={value?.text}
      ref={inputRef}
      onChange={e => {
        onChangeValue?.({
          lat: value?.lat,
          lng: value?.lng,
          text: e.target.value,
        });
      }}
    />
  );
};

export default AddressAutocomplete;
