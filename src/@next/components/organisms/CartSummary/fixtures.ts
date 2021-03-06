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

export const product = {
  id: "abc123",
  name: "The Great Square Table",  
  quantity: 2,
  sku: "TGS-122A",
  thumbnail: {
    alt: "product image",
    url: productImage,
  },
  variant: {
    id: '333',
  },
};

const activeStepIndexCheckout = {
  step1: 0,
  step2: 1,
};

export const DEFAULT_PROPS = {
  activeStepIndex: activeStepIndexCheckout.step1,
  onClickHandle: ()=> undefined,
  products: [product, product, product],
  promoCode: money,
  shipping: money,
  subtotal: money,
  total: money,  
  totalProducts: 3,
};
