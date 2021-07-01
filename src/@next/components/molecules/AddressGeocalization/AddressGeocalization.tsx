import {
  useAddressGeocalizationInfo,
  useDistrictSelected,
} from "@temp/@next/hooks";
import React from "react";
import { Button, GpsIcon } from "@farmacia-retail/farmauna-components";
import { addressGeoModalService } from "../AddressGeoModal/AddressGeoModalService";
import { AddressGeocalizationInfo } from "./AddressGeocalizationInfo";
import * as S from "./styles";
import { IProps } from "./types";

export const AddressGeocalization: React.FC<IProps> = React.memo(({ mode }) => {
  const [districtSelected] = useDistrictSelected();
  const [show] = useAddressGeocalizationInfo();
  const handleChangeAddress = () => {
    addressGeoModalService.show(true);
  };

  return (
    <>
      <S.Wrapper>
        <S.Localization mode={mode}>
          <S.GeocalizationIcon>
            <GpsIcon size={34} onClick={handleChangeAddress} />
          </S.GeocalizationIcon>
          <S.District className="district">
            <S.Label onClick={handleChangeAddress}>Enviar a: </S.Label>
            <S.Address className="district-name">
              {districtSelected.name}
            </S.Address>
          </S.District>
        </S.Localization>
        <S.Button className="button-border-change">
          <Button
            color="secondary"
            variant="outline"
            type="button"
            size="small"
            onClick={handleChangeAddress}
          >
            Cambiar
          </Button>
        </S.Button>
      </S.Wrapper>
      {!!show && <AddressGeocalizationInfo />}
    </>
  );
});
