import { IItems } from "@sdk/api/Cart/types";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
import isEqual from "lodash/isEqual";
import { IProductVariantPricing } from "../types";
import { ISimpleProduct } from "../types/IProduct";

export type ProductOnCart = {
    quantity: number;
    quantityAvailable: number
}

export const getStockAvailable = (product: ISimpleProduct): number => {
    const stockAvailable = product.variants?.[0]?.quantityAvailable || 0;
    return stockAvailable;
}

export const getProductOnCart = (product: ISimpleProduct, items: IItems): ProductOnCart => {
    const productOnCart = items && items.find(
        ({ variant }) => variant.product && (variant.product.id === product.id)
    );
    if (!productOnCart) {
        return { quantity: 0, quantityAvailable: MAX_ORDER_PER_PRODUCT }
    }
    return {
        quantity: productOnCart.quantity,
        quantityAvailable: productOnCart.variant.quantityAvailable ? productOnCart.variant.quantityAvailable : 0,
    };
}

export const checkProductCanAddToCart = (product: ISimpleProduct, items: IItems): boolean => {
    const stockAvailable = getStockAvailable(product);
    const productOnCart = getProductOnCart(product, items);
    return ((productOnCart.quantityAvailable > productOnCart.quantity)) &&
        (stockAvailable > 0);
}

export const checkPricingVariantIsOnSale = (variantPricing: IProductVariantPricing): boolean => {
    // también se puede usar la propiedad OnSale
    return !isEqual(variantPricing.priceUndiscounted, variantPricing.price);
}
export const checkProductIsOnSale = (product: ISimpleProduct): boolean => {
    if (!product?.variants?.[0]?.pricing) { return false; }
    return checkPricingVariantIsOnSale(product.variants[0].pricing);
}

export const getProductPricingClass = (canAddToCart: boolean, isOnSale: boolean): string => {
    const className: string = 'price';
    if (canAddToCart && !isOnSale) {
        return className;
    }
    return `${className} ${!canAddToCart ? "outStock_price" : isOnSale ? "discounted_price" : ""}`
}
