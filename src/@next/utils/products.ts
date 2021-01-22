import { IItems } from "@sdk/api/Cart/types";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";

export type ProductOnCart = {
    quantity: number;
    quantityAvailable: number
}

export const getStockAvailable = (product: any): number => {
    const stockAvailable = product.variants?.[0]?.quantityAvailable || 0;
    return stockAvailable;
}

export const getProductOnCart = (product: any, items: IItems): ProductOnCart => {
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

export const checkCanAddToCart = (product: any, items: IItems): boolean => {
    const stockAvailable = getStockAvailable(product);
    const productOnCart = getProductOnCart(product, items);
    return ((productOnCart.quantityAvailable > productOnCart.quantity)) &&
        (stockAvailable > 0);
}
