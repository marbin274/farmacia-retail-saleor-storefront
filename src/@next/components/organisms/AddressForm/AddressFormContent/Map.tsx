// TODO: mover el mapa a un componente global
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { mapsApiKey } from '@temp/core/constants';
import MapIcon from '@temp/images/auna/map-icon.svg';
import * as S from './styles';
import { LIMA_BOUNDS } from '@temp/core/config';
import classNames from 'classnames';
import { IGeoJson } from '@temp/core/types/address';
import farmatheme from '@farmatheme';

type IProps = {
  geoJson?: IGeoJson;
  hasError?: boolean;
  location?: google.maps.LatLngLiteral;
  onChangeLocation?: (
    location: google.maps.LatLngLiteral,
    address: string
  ) => void;
};

export const Map: FC<IProps> = ({
  geoJson,
  hasError,
  location,
  onChangeLocation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [features, setFeatures] = useState<google.maps.Data.Feature[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (window.google?.maps) {
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
  }, [mapRef]);

  const init = useCallback(() => {
    const newMap = new google.maps.Map(mapRef.current!, {
      center: { lat: -12.046373, lng: -77.042755 },
      fullscreenControl: true,
      mapTypeControl: false,
      panControl: false,
      restriction: {
        latLngBounds: LIMA_BOUNDS,
        strictBounds: true,
      },
      streetViewControl: false,
      zoom: 16,
    });

    newMap.data.setStyle({
      fillColor: farmatheme.theme.colors.primary.light,
      strokeColor: farmatheme.theme.colors.primary.light,
      strokeWeight: 1,
    });

    setMap(newMap);
  }, []);

  const setMarkerOnMap = (lat: number, lng: number) => {
    const newMarker = new google.maps.Marker({
      icon: MapIcon,
      map,
      position: { lat, lng },
    });

    setMarker((prev) => {
      prev?.setMap(null);
      return newMarker;
    });
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    map.addListener('click', (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      new google.maps.Geocoder().geocode({ location: { lat, lng } }, (res) => {
        onChangeLocation?.({ lat, lng }, res?.[0]?.formatted_address || '');
      });
    });

    map.data.addListener('click', (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      new google.maps.Geocoder().geocode({ location: { lat, lng } }, (res) => {
        onChangeLocation?.({ lat, lng }, res?.[0]?.formatted_address || '');
      });
    });
  }, [map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!location?.lat || !location?.lng) {
      if (marker) {
        marker.setMap(null);
        setMarker(undefined);
      }
      return;
    }

    setMarkerOnMap(location.lat, location.lng);
    map.setCenter({ lat: location.lat, lng: location.lng });
  }, [location?.lng, map]);

  useEffect(() => {
    if (!map || !geoJson) {
      return;
    }

    clearFeatures();
    const features = map.data.addGeoJson(geoJson);
    setFeatures(features);
  }, [map, geoJson]);

  const clearFeatures = () => {
    for (const feature of features) {
      map?.data.remove(feature);
    }
  };

  return (
    <div
      className={classNames(
        'fa-w-full fa-h-auto fa-rounded-2xl fa-overflow-hidden',
        {
          'fa-border fa-border-solid fa-border-error-medium': !!hasError,
        }
      )}
    >
      <S.Map ref={mapRef} />
    </div>
  );
};

export default Map;
