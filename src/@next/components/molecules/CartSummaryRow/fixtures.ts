import productImage from "./productImage.png";
import { IProps } from "./types";

export const DEFAULT_PROPS : IProps = {
  name: "The Great Square Table",
  price: {
    gross: {
      amount: 123,
      culture: "es-PE",
      currency: "PEN",
    },
    net: {
      amount: 100,
      culture: "es-PE",
      currency: "PEN",
    },
  },
  quantity: 2,
  sku: "TGS-122A",
  thumbnail: {
    alt: "Product image",
    url: productImage,
  },
};
