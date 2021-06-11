import React from "react";
import { Icon } from "../../atoms";
import * as S from "./styles";
import { Button, BulletXFilledIcon } from "@farmacia-retail/farmauna-components";

export const AddressGeoModalInfo = ({ onClose }: { onClose: () => void }) => {

    return (
        <S.Modal>
            <S.Header>
                <S.CloseIcon>
                    <BulletXFilledIcon
                        size={32}
                        color="#452FBA"
                        onClick={onClose}
                    />
                </S.CloseIcon>
            </S.Header>
            <S.Content>
                <div>
                    <Icon
                        heightViewPort={92}
                        name="manWithMedicine"
                        widthViewPort={96}
                        size={96}
                    />
                </div>
                <S.Title>Carrito de compras actualizado</S.Title>
                <S.Body>
                    <p>Se ha modificado el estado de tus productos en tu carrito</p>
                </S.Body>
                <S.Actions>
                    <Button variant="default"
                        onClick={onClose}
                    >
                        Entendido
            </Button>
                </S.Actions>
            </S.Content>
        </S.Modal>
    );
}

