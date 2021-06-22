import React from "react";
import { Icon } from "../../atoms";
import * as S from "./styles";
import { addressGeoModalService } from "../AddressGeoModal/AddressGeoModalService";
import { useAddressGeocalizationInfo } from "@temp/@next/hooks";
import { Button } from "@farmacia-retail/farmauna-components";

export const AddressGeocalizationInfo: React.FC = () => {
  const [, setShow] = useAddressGeocalizationInfo();

  const handleChangeAddress = () => {
    addressGeoModalService.show(true);
  };

  return (
    <S.AlertWrapper>
      <S.Alert className="district--alert">
        <S.AlertBody>
          <S.AlertIcon>
            <Icon name="medicineBottle" size={40} viewPort={40} />
          </S.AlertIcon>
          <S.AlertText>
            <span>¡Hola!</span> aquí puedes cambiar el distrito donde enviaremos
            tus productos.
          </S.AlertText>
        </S.AlertBody>
        <S.AlertAction>
          <div>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setShow(false);
              }}
            >
              Mantener
            </Button>
          </div>
          <div>
            <Button variant="default" type="button" onClick={handleChangeAddress}>
              Cambiar distrito
            </Button>
          </div>
        </S.AlertAction>
      </S.Alert>
    </S.AlertWrapper>
  );
};
