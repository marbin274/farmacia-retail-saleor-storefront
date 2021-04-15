import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { TaxedMoney } from "@components/containers";

export const CartResume: React.FC<IProps> = ({promoPrice, subTotalPrice, shippingPrice, totalPrice, totalProducts})=>{
    return <S.Wrapper>
        <S.Title>
            <S.TitleText>Resumen del pedido</S.TitleText>
        </S.Title>
        <S.Body>
            <S.LineInfo>
                <S.LineInfoDescription>{totalProducts} {totalProducts > 1 ? "Productos" : "Producto"}</S.LineInfoDescription>
                <S.LineInfoPrice>
                    <TaxedMoney taxedMoney={subTotalPrice} />
                </S.LineInfoPrice>
            </S.LineInfo>
            {promoPrice &&
                <S.LineInfo>
                    <S.LineInfoDescription>Cupón de descuento</S.LineInfoDescription>
                    <S.LineInfoPrice>
                        {"- "}<TaxedMoney taxedMoney={promoPrice} />
                    </S.LineInfoPrice>
                </S.LineInfo>
            }
            {shippingPrice &&
                <S.LineInfo>
                    <S.LineInfoDescription>Costo de envío</S.LineInfoDescription>
                    <S.LineInfoPrice>
                        <TaxedMoney taxedMoney={shippingPrice} />
                    </S.LineInfoPrice>
                </S.LineInfo>
            }
        </S.Body>
        <S.Footer>
            <S.LineInfo>
                <S.LineInfoDescription>Total</S.LineInfoDescription>
                <S.LineInfoPrice>
                    <TaxedMoney taxedMoney={totalPrice} />
                </S.LineInfoPrice>
            </S.LineInfo>
        </S.Footer>
    </S.Wrapper>
}
