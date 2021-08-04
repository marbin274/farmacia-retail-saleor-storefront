import { ISimpleProduct } from "@sdk/types/IProduct";
import { ICheckoutModelLine } from "@temp/@sdk/repository";


// TODO: create component instead of function
export const getProductPricingClass = (
  canAddToCart: boolean,
  isOnSale: boolean
): string => {
  const className: string = "price";
  if (canAddToCart && !isOnSale) {
    return className;
  }
  return `${className} ${
    !canAddToCart ? "outStock_price" : isOnSale ? "discounted_price" : ""
  }`;
};

export const convertProductOnCartInProduct = (
  productOnCart: ICheckoutModelLine
): ISimpleProduct => {
  return { 
    ...productOnCart, 
    attributes: productOnCart.variant.product?.attributes || [],
    id: productOnCart.variant.product?.id || "",
   };
};
