import { PRODUCT_STICKERS } from "@temp/core/config";
import React from "react";
import * as S from "./styles";
import { Chip } from "@farmacia-retail/farmauna-components";

interface IProductLabelProps {
  isOnSale?: boolean;
  isOutStock?: boolean;
}

export const ProductDetailSticker = ({
  isOnSale,
  isOutStock,
}: IProductLabelProps) => {
  return isOutStock || isOnSale ? (
      <S.ProductSticker>
        <Chip
          label={
            isOutStock
              ? PRODUCT_STICKERS.Agotado.label
              : PRODUCT_STICKERS.Oferta.label
          }
          disabled={isOutStock}
        />
      </S.ProductSticker>
    ) : null;
};
