import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { mapsApiKey } from "@temp/constants";
import MapIcon from "@temp/images/auna/map-icon.svg";
import * as S from "./styles";
import { LIMA_BOUNDS } from "@temp/core/config";

type IProps = {
  location?: google.maps.LatLngLiteral;
  onChangeLocation?: (location: google.maps.LatLngLiteral) => void;
};

export const Map: FC<IProps> = ({ location, onChangeLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [, setMarker] = useState<google.maps.Marker>();

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
      libraries: ["places"],
      version: "weekly",
    })
      .load()
      .then(() => {
        init();
      });
  }, [mapRef]);

  const init = useCallback(() => {
    const newMap = new google.maps.Map(mapRef.current!, {
      center: { lat: -12.046373, lng: -77.042755 },
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

    setMap(newMap);
  }, []);

  const setMarkerOnMap = (lat: number, lng: number) => {
    const newMarker = new google.maps.Marker({
      icon: MapIcon,
      map,
      position: { lat, lng },
    });

    setMarker(prev => {
      prev?.setMap(null);
      return newMarker;
    });
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    map.addListener("click", (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      onChangeLocation?.({ lat, lng });
    });
  }, [map]);

  useEffect(() => {
    if (!map || !location?.lat || !location?.lng) {
      return;
    }

    setMarkerOnMap(location.lat, location.lng);
    map.setCenter({ lat: location.lat, lng: location.lng });
  }, [location?.lng, map]);

  return (
    <S.MapWrapper>
      <S.Map ref={mapRef} />
      <S.MapHint>Puedes mover tu ubicación en el mapa</S.MapHint>
    </S.MapWrapper>
  );
};

export default Map;
