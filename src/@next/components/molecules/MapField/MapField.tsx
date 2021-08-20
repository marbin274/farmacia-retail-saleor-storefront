import {
  InformationIcon,
  ErrorIcon,
} from '@farmacia-retail/farmauna-components';
import { isCoordinatesInsideBouds } from '@temp/core/utils';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { Alert } from '..';
import { Map } from '@components/molecules';
import { IMapFieldProps } from './types';

export const MapField: FC<IMapFieldProps> = ({
  addressName,
  geoJsonBounds,
  latName = 'latitude',
  lngName = 'longitude',
  onChangeLocation,
}) => {
  const { values, setFieldValue, errors } = useFormikContext();

  const getCoordinates = () => {
    if (!values?.[latName] || !values?.[lngName]) {
      return;
    }

    return { lat: Number(values[latName]), lng: Number(values[lngName]) };
  };

  const renderAlert = () => {
    if (!geoJsonBounds || !values[latName]) {
      return null;
    }

    const isInsideBounds = isCoordinatesInsideBouds(
      Number(values[latName]),
      Number(values[lngName]),
      geoJsonBounds
    );

    if (isInsideBounds) {
      return (
        <Alert
          type="info"
          message="Verifica tu ubicación en el mapa"
          icon={<InformationIcon />}
          className="fa-mt-2"
        />
      );
    }

    return (
      <Alert
        type="error"
        message="Por el momento no tenemos cobertura en esta zona"
        icon={<ErrorIcon />}
        className="fa-mt-2"
      />
    );
  };

  return (
    <div>
      <Map
        location={getCoordinates()}
        onChangeLocation={(location, address) => {
          setFieldValue(addressName, address);
          setFieldValue(latName, String(location.lat));
          setFieldValue(lngName, String(location.lng));
          onChangeLocation?.(location, address);
        }}
        geoJson={geoJsonBounds}
        hasError={!!errors?.[latName]}
      />
      {renderAlert()}
    </div>
  );
};
