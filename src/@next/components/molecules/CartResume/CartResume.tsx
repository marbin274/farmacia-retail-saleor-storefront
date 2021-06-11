import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { TaxedMoney } from "@components/containers";
import { CHECKOUT_STEPS } from "@temp/core/config";
import { Button } from "@farmacia-retail/farmauna-components";

export const CartResume: React.FC<IProps> = ({
  promoPrice,
  subTotalPrice,
  shippingPrice,
  totalPrice,
  totalProducts,
  activeStepIndex,
  onClickHandle,
}) => {
  const indexOfStep2Checkout = CHECKOUT_STEPS[1].index;
  return (
    <S.Wrapper>
      <S.Title>
        <S.TitleText>Resumen del pedido </S.TitleText>
      </S.Title>
      {activeStepIndex === indexOfStep2Checkout && (
        <S.Body>
          <S.LineInfo>
            <S.LineInfoDescriptionDetail>
              <span>Datos de entrega</span>

              <Button variant="outline" size="small" onClick={onClickHandle}>
                Ver Detalle
              </Button>
            </S.LineInfoDescriptionDetail>
          </S.LineInfo>
        </S.Body>
      )}
      <S.Body>
        <S.LineInfo>
          <S.LineInfoDescription>
            {totalProducts} {totalProducts > 1 ? "Productos" : "Producto"}
          </S.LineInfoDescription>
          <S.LineInfoPrice>
            <TaxedMoney taxedMoney={subTotalPrice} />
          </S.LineInfoPrice>
        </S.LineInfo>
        {promoPrice && activeStepIndex === indexOfStep2Checkout && (
          <S.LineInfo>
            <S.LineInfoDescription>Cupón de descuento</S.LineInfoDescription>
            <S.LineInfoPrice>
              {"- "}
              <TaxedMoney taxedMoney={promoPrice} />
            </S.LineInfoPrice>
          </S.LineInfo>
        )}
        {shippingPrice && (
          <S.LineInfo>
            <S.LineInfoDescription>Costo de envío</S.LineInfoDescription>
            <S.LineInfoPrice>
              <TaxedMoney taxedMoney={shippingPrice} />
            </S.LineInfoPrice>
          </S.LineInfo>
        )}
      </S.Body>
      <S.Footer>
        <S.LineInfo>
          <S.LineInfoDescription className="line-info-total">
            Total
          </S.LineInfoDescription>
          <S.LineInfoPrice>
            <TaxedMoney taxedMoney={totalPrice} />
          </S.LineInfoPrice>
        </S.LineInfo>
      </S.Footer>
    </S.Wrapper>
  );
};
