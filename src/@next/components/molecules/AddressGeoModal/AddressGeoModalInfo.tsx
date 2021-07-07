import React from "react";
import * as S from "./styles";
import { Button, BulletXFilledIcon } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";
import { useCart } from "@temp/@sdk/react";
export const AddressGeoModalInfo = ({ onClose }: { onClose: () => void }) => {

  const { items } = useCart();
  const cartItemsQuantity = 
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

    return (
        <S.Modal>
            <S.Header>
                <S.CloseIcon>
                    <BulletXFilledIcon
                        size={32}
                        color={farmatheme.theme.colors.interactive}
                        onClick={onClose}
                    />
                </S.CloseIcon>
            </S.Header>
            <S.Content>
        <S.CartBox>
          {cartItemsQuantity > 0 ? (
            <S.CartItemQuantity>
              <span>{cartItemsQuantity}</span>
            </S.CartItemQuantity>
          ) : null}
          <S.CartIcon />
        </S.CartBox>

        <S.Title>Revisa tu carrito <br/> de compras</S.Title>
        <S.Body>
          <p>Algunos de tus productos <br/> han sido actualizados </p>      
        </S.Body>
        <S.Actions>
          <Button variant="default" onClick={onClose}>
            Entendido
          </Button>
        </S.Actions>
      </S.Content>
    </S.Modal>
  );
};
