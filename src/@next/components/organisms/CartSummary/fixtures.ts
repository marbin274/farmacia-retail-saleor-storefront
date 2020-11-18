import productImage from "./productImage.png";

const money = {
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
};

const product = {
  id: "abc123",
  name: "The Great Square Table",
  price: money,
  quantity: 2,
  sku: "TGS-122A",
  thumbnail: {
    alt: "product image",
    url: productImage,
  },
};

export const DEFAULT_PROPS = {
  products: [product, product, product],
  promoCode: money,
  shipping: money,
  subtotal: money,
  total: money,
};
