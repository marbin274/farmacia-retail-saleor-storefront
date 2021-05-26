import { useLocalStorage } from "@temp/@next/hooks";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { LocalStorageItems } from "@temp/@sdk/repository";
import React from "react";
import { Button, Icon, IconButton } from "../../atoms";
import { addressGeoModalService } from "../AddressGeoModal/AddressGeoModalService";
import * as S from "./styles";
import { IProps } from "./types";


export const AddressGeocalization: React.FC<IProps> = React.memo(({ mode }) => {

    const [districtSelected] = useDistrictSelected();
    const { storedValue: show, setValue: setShow } = useLocalStorage<boolean>(LocalStorageItems.SHOW_CHANGE_DISTRICT_MODAL, true);

    const handleChangeAddress = () => {
        addressGeoModalService.show(true);
    }


    return <S.Wrapper>
        <S.Localization
            mode={mode}
        >
            <S.GeocalizationIcon>
                <IconButton
                    name="addressGeo"
                    size={20}
                    heightViewPort={21}
                    widthViewPort={14}
                />
            </S.GeocalizationIcon>
            <S.District className="district">
                <S.Label>Enviar a: </S.Label>
                <S.Address className="district-name">{districtSelected.description}</S.Address>
            </S.District>
        </S.Localization>
        <S.Button>
            <Button
                color="secondary"
                outline
                onClick={handleChangeAddress}
            >
                Cambiar
            </Button>
        </S.Button>
        {
            !!show && <S.Alert>
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
                            onClick={() => { setShow(false) }}
                        >
                            Manterner
                    </Button>
                    </div>
                    <div>

                        <Button
                            color="primary"
                            onClick={handleChangeAddress}
                        >
                            Cambiar distrito
                    </Button>
                    </div>
                </S.AlertAction>
            </S.Alert>
        }
    </S.Wrapper>;
});