import farmatheme from '@farmatheme';
import { Loader } from '@googlemaps/js-api-loader';
import { LIMA_BOUNDS, LOCATION_DEFAULT } from '@temp/core/config';
import { mapsApiKey } from '@temp/core/constants';
import classNames from 'classnames';
import React from 'react';
import { initFullscreenControl } from './customFullScreen';
import * as S from './styles';
import { IMapProps } from './types';
export const Map: React.FC<IMapProps> = ({
  geoJson,
  hasError,
  location,
  onChangeLocation,
}) => {
  const mapDivRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<google.maps.Map>(null);
  const fullScreenControlRef = React.useRef<HTMLDivElement>(null);
  const changePositionMapAndMarker = () => {
    if (!mapRef.current || !location?.lat || !location?.lng) {
      return;
    }
    const position = { lat: location.lat, lng: location.lng };

    mapRef.current.setCenter(position);
  };

  const setGeoJson = () => {
    if (!mapRef.current || !geoJson) {
      return;
    }
    mapRef.current.data.forEach(function (feature) {
      mapRef.current.data.remove(feature);
    });
    mapRef.current.data.addGeoJson(geoJson);
  };

  const init = React.useCallback(() => {
    const myLatlng = LOCATION_DEFAULT;
    const newMap = new google.maps.Map(mapDivRef.current!, {
      center: myLatlng,
      clickableIcons: false,
      fullscreenControl: false,
      mapTypeControl: false,
      panControl: false,
      restriction: {
        latLngBounds: LIMA_BOUNDS,
        strictBounds: true,
      },
      streetViewControl: false,
      zoom: 16,
    });
    initFullscreenControl(
      newMap,
      fullScreenControlRef.current,
      mapDivRef.current
    );

    newMap.data.setStyle({
      fillColor: farmatheme.theme.colors.highlight.medium,
      strokeColor: farmatheme.theme.colors.highlight.medium,
      strokeWeight: 1,
      fillOpacity: 0.1,
    });

    newMap.addListener('click', (e: any) => {
      const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      new google.maps.Geocoder().geocode({ location: position }, (res) => {
        onChangeLocation?.(position, res?.[0]?.formatted_address || '');
      });
    });

    newMap.data.addListener('click', (e: any) => {
      const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      new google.maps.Geocoder().geocode({ location: position }, (res) => {
        onChangeLocation?.(position, res?.[0]?.formatted_address || '');
      });
    });

    newMap.addListener('dragend', () => {
      const position = {
        lat: newMap.getCenter().lat(),
        lng: newMap.getCenter().lng(),
      };
      new google.maps.Geocoder().geocode({ location: position }, (res) => {
        onChangeLocation?.(position, res?.[0]?.formatted_address || '');
      });
    });
    const markerDiv = document.createElement('div');
    markerDiv.classList.add('centerMarker');
    newMap.getDiv().append(markerDiv);
    mapRef.current = newMap;
    setGeoJson();
    changePositionMapAndMarker();
  }, []);

  React.useEffect(() => {
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

  React.useEffect(changePositionMapAndMarker, [location?.lng]);

  React.useEffect(setGeoJson, [mapRef, geoJson]);

  return (
    <div
      className={classNames(
        'fa-w-full fa-h-auto fa-rounded-2xl fa-overflow-hidden',
        {
          'fa-border fa-border-solid fa-border-error-medium': !!hasError,
        }
      )}
    >
      <S.Map isSetLocation={!!location?.lat} ref={mapDivRef} />
      <div style={{ display: 'none' }}>
        <S.FullScreenControl ref={fullScreenControlRef}>
          <button title="Toggle Fullscreen" type="button">
            <div className="fullscreen-control-icon fullscreen-control-top-left"></div>
            <div className="fullscreen-control-icon fullscreen-control-top-right"></div>
            <div className="fullscreen-control-icon fullscreen-control-bottom-left"></div>
            <div className="fullscreen-control-icon fullscreen-control-bottom-right"></div>
          </button>
        </S.FullScreenControl>
      </div>
    </div>
  );
};

export default Map;
