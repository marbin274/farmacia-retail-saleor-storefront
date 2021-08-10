import { PRODUCT_STICKERS } from "@temp/core/config";
import React from "react";
import farmatheme from "@farmatheme";
import { Chip } from "@farmacia-retail/farmauna-components";

interface IProductLabelProps {
  isOnSale?: boolean;
  isOutStock?: boolean;
}

export const ProductSticker = ({
  isOnSale,
  isOutStock,
}: IProductLabelProps) => {
  let chipComponent = null;
  if (isOnSale) {
    chipComponent = <Chip label={PRODUCT_STICKERS.Oferta.label} />;
  }
  if (isOutStock) {
    chipComponent = (
      <Chip label={PRODUCT_STICKERS.Agotado.label}  bgColor={farmatheme.theme.colors.neutral.medium} disabled={true} />
    );
  }
  return chipComponent;
};
