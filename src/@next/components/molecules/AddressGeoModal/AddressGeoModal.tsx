import { Overlay } from "@components/organisms";
import { useAddressGeocalizationInfo, useDistrictSelected } from "@temp/@next/hooks";
import { IDistrictSelected } from "@temp/@sdk/repository";
import { useShopContext } from "@temp/components/ShopProvider/context";
import { TOTAL_DISTRICT } from "@temp/core/config";
import React from "react";
import { InputSelect } from "..";
import { Icon } from "../../atoms";
import { AddressGeoModalInfo } from "./AddressGeoModalInfo";
import { addressGeoModalService } from "./AddressGeoModalService";
import * as S from "./styles";
import { Button, BulletXFilledIcon } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";

export const AddressGeoModal: React.FC = () => {
    const { availableDistricts } = useShopContext();
    const [, setShowAddressGeocalizationInfo] = useAddressGeocalizationInfo();
    const [districtSelected, setDistrictSelected] = useDistrictSelected();
    const [show, setShow] = React.useState(false);
    const [showInfo, setShowInfo] = React.useState<boolean>(false);
    const [district, setDistrict] = React.useState<IDistrictSelected>(districtSelected);

    const handleConfirm = () => {
        setDistrictSelected(district);
        setShowAddressGeocalizationInfo(false);
        if (districtSelected.warehouse?.id !== district.warehouse?.id) {
            setShowInfo(true);
            return;
        }
        setShow(false);        
    }

    const handleChangeDistrict = (value: any, name?: any) => {
        setDistrict(value);
    }

    const handleCloseModal = () => {
        setShow(false);
        setTimeout(() => {
            setDistrict(districtSelected);
            setShowInfo(false);
        }, 500);
    }

    React.useEffect(()=>{
        setDistrict(districtSelected);
    },[districtSelected]);

    React.useEffect(() => {
        const subscription = addressGeoModalService
            .on()
            .subscribe((payload: boolean) => {
                setShow(payload);
            });

        return subscription.unsubscribe;
    }, []);

    return (
        <Overlay
            position="center"
            show={show}
            duration={0}
            transparent={false}
        >
            {showInfo ?
                <AddressGeoModalInfo onClose={handleCloseModal} /> :
                <S.Modal>
                    <S.Header>
                        <S.CloseIcon>
                            <BulletXFilledIcon
                                size={32}
                                color={farmatheme.theme.colors.interactive}
                                onClick={handleCloseModal}
                                />
                        </S.CloseIcon>
                    </S.Header>
                    <S.Content>
                        <S.Icon>
                            <Icon
                                name="medicineBottle"
                                size={50}
                                viewPort={40}
                            />
                        </S.Icon>
                        <S.Title>¿A qué distrito enviaremos tus productos?</S.Title>
                        <S.Body>
                            <InputSelect
                                inputProps={{
                                    "data-cy": "selectDistrict",
                                    name: "district",
                                }}
                                name="district"
                                label=""
                                options={availableDistricts || []}
                                value={district}
                                optionLabelKey="name"
                                optionValueKey="id"
                                onChange={handleChangeDistrict}

                            />
                            <S.TextInfo>
                                <Icon name="info" size={50} heightViewPort={50} widthViewPort={20} />
                                <span>Llegamos a {TOTAL_DISTRICT} distritos de Lima y seguiremos ampliando nuestra cobertura</span>
                            </S.TextInfo>
                        </S.Body>
                        <S.Actions>
                            <Button variant="default"
                                onClick={handleConfirm}
                            >
                                Confirmar
                            </Button>
                        </S.Actions>

                    </S.Content>
                </S.Modal>
            }
        </Overlay>);
}
