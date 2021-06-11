import { PRODUCT_STICKERS } from "@temp/core/config";
import React from "react";
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
  if (isOutStock) {
    chipComponent = (
      <Chip label={PRODUCT_STICKERS.Agotado.label} disabled={true} />
    );
  }
  if (isOnSale) {
    chipComponent = <Chip label={PRODUCT_STICKERS.Oferta.label} />;
  }
  return <div className="fa-flex fa-justify-start">{chipComponent}</div>;
};
