import React from "react";
import { Button, Icon } from "../../atoms";
import * as S from "./styles";
import { addressGeoModalService } from "../AddressGeoModal/AddressGeoModalService";
import { useAddressGeocalizationInfo } from "@temp/@next/hooks";

export const AddressGeocalizationInfo: React.FC = () => {

    const [, setShow] = useAddressGeocalizationInfo();

    const handleChangeAddress = () => {
        addressGeoModalService.show(true);
    }

    return (
        <S.Alert>
            <S.AlertBody>
                <S.AlertIcon>
                    <Icon
                        name="medicineBottle"
                        size={40}
                        viewPort={40}
                    />
                </S.AlertIcon>
                <S.AlertText>
                    <span>¡Hola!</span> aquí puedes cambiar el distrito donde enviaremos tus productos.
    </S.AlertText>
            </S.AlertBody>
            <S.AlertAction>
                <div>
                    <Button
                        color="secondary"
                        outline
                        type="button"
                        onClick={() => { setShow(false) }}
                    >
                        Manterner
        </Button>
                </div>
                <div>

                    <Button
                        color="primary"
                        type="button"
                        onClick={handleChangeAddress}
                    >
                        Cambiar distrito
        </Button>
                </div>
            </S.AlertAction>
        </S.Alert>
    );
}

