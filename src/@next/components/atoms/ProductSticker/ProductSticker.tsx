import { PRODUCT_STICKERS } from '@temp/core/config';
import React from 'react';
import * as S from './styles';

interface IProductLabelProps {
    isOnSale?: boolean;
    isOutStock?: boolean;
}

export const ProductSticker = ({ isOnSale, isOutStock }: IProductLabelProps) => {
    if (isOutStock) {
        return <S.ProductSticker backgroundColor={PRODUCT_STICKERS.Agotado.backgroundColor}>{PRODUCT_STICKERS.Agotado.label}</S.ProductSticker>;
    }
    if (isOnSale) {
        return <S.ProductSticker backgroundColor={PRODUCT_STICKERS.Oferta.backgroundColor}>{PRODUCT_STICKERS.Oferta.label}</S.ProductSticker>;
    } else {
        return null;
    }
}

