import React, {
  RefForwardingComponent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { InputField } from '@farmacia-retail/farmauna-components';
import { IProps as ITextFieldProps } from '@components/molecules/TextField/types';
import { mapsApiKey } from '@temp/core/constants';
import { LIMA_BOUNDS } from '@temp/core/config';

export type IAddressAutocompleteValue = {
  text?: string;
  lat?: number;
  lng?: number;
};

type IProps = {
  error?: string;
  helperText?: string;
  onChangeValue?: (
    value: IAddressAutocompleteValue,
    onlyText?: boolean
  ) => void;
  placeholder: string;
  value?: IAddressAutocompleteValue;
};

export type IAddressAutocompleteProps = IProps & Omit<ITextFieldProps, 'value'>;

export type IAddressAutocompleteRef = {
  focus: (options?: FocusOptions) => void;
};

const AddressAutocompleteWithRef: RefForwardingComponent<
  IAddressAutocompleteRef,
  IAddressAutocompleteProps
> = ({ onChangeValue, value, helperText, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window?.google?.maps) {
      init();
      return;
    }

    new Loader({
      apiKey: mapsApiKey!,
      libraries: ['places'],
      version: 'weekly',
    })
      .load()
      .then(() => {
        init();
      });
  }, []);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const init = useCallback(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current!,
      {
        bounds: LIMA_BOUNDS,
        componentRestrictions: { country: ['pe'] },
        types: ['address'],
      }
    );

    autocomplete.addListener('place_changed', () => {
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
    <>
      <InputField
        {...props}
        value={value?.text}
        ref={inputRef}
        onChange={(e) => {
          onChangeValue?.(
            {
              lat: value?.lat,
              lng: value?.lng,
              text: e.target.value,
            },
            true
          );
        }}
      />
      {!props.error && helperText && (
        <span className="fa-text-xs fa-mt-2 fa-text-neutral-dark">
          {helperText}
        </span>
      )}
    </>
  );
};

export const AddressAutocomplete = forwardRef(AddressAutocompleteWithRef);
