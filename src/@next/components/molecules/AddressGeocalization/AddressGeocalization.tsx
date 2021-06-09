import { useAddressGeocalizationInfo, useDistrictSelected } from "@temp/@next/hooks";
import React from "react";
import { Button, IconButton } from "../../atoms";
import { addressGeoModalService } from "../AddressGeoModal/AddressGeoModalService";
import { AddressGeocalizationInfo } from "./AddressGeocalizationInfo";
import * as S from "./styles";
import { IProps } from "./types";


export const AddressGeocalization: React.FC<IProps> = React.memo(({ mode }) => {

    const [districtSelected] = useDistrictSelected();    
    const [show] = useAddressGeocalizationInfo();
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
                <S.Address className="district-name">{districtSelected.name}</S.Address>
            </S.District>
        </S.Localization>
        <S.Button>
            <Button
                color="secondary"
                outline
                type="button"
                onClick={handleChangeAddress}
            >
                Cambiar
            </Button>
        </S.Button>
        {
            !!show && <AddressGeocalizationInfo/>
        }
    </S.Wrapper>;
});
