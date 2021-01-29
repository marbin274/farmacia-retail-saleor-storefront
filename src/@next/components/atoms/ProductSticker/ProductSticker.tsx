import { PRODUCT_STICKERS } from '@temp/core/config';
import React from 'react';
import * as S from './styles';

interface IProductLabelProps {
    canAddToCart?: boolean,
    isOnSale?: boolean
}

export const ProductSticker = ({ canAddToCart, isOnSale }: IProductLabelProps) => {

    if (!canAddToCart) {

        return <S.ProductSticker backgroundColor={PRODUCT_STICKERS.Agotado.backgroundColor}>{PRODUCT_STICKERS.Agotado.label}</S.ProductSticker>;
    } else if (isOnSale) {
        return <S.ProductSticker backgroundColor={PRODUCT_STICKERS.Oferta.backgroundColor}>{PRODUCT_STICKERS.Oferta.label}</S.ProductSticker>;
    } else {
        return null;
    }
}

