import React from "react";
import { Button, Icon } from "../../atoms";
import * as S from "./styles";

export const AddressGeoModalInfo = ({ onClose }: { onClose: () => void }) => {

    return (
        <S.Modal>
            <div>
                <Icon
                    heightViewPort={92}
                    name="manWithMedicine"
                    widthViewPort={96}
                    size={96}
                />
            </div>
            <S.Title>Revisa tu carrito de compras </S.Title>
            <S.Body>
                <p>Es posible que algunos productos se hayan actualizado.</p>
            </S.Body>
            <S.Actions>
                <Button
                    onClick={onClose}
                >
                    Entendido
            </Button>
            </S.Actions>
        </S.Modal>
    );
}

