import { IItems } from "@sdk/api/Cart/types";
import { MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
import isEqual from "lodash/isEqual";
import { IProductVariantPricing } from "../types";
import { ISimpleProduct } from "../types/IProduct";

export type ProductOnCart = {
    quantity: number;
    quantityAvailable: number
}

export const getProductsWithQuantity = (products: ISimpleProduct[], productsOnCart?: IItems): ISimpleProduct[] => {
    return !products ? [] : products.filter(product => product.pricing).map((product) => getOneProductWithQuantity(product, productsOnCart));
}

export const getOneProductWithQuantity = (product: ISimpleProduct, productsOnCart?: IItems): ISimpleProduct => {
    const productOnCart = productsOnCart?.find(({ variant }) =>
        (product.variants && product.variants[0]) ? variant.id === product.variants[0].id : false
    );
    product.quantity = productOnCart ? productOnCart.quantity : 0;

    if (!product.variants) {
        product.variants = [];
    }

    return {
        ...product,
    };

}

export const getStockAvailable = (product: ISimpleProduct): number => {
    if (product.variants?.[0].quantityAvailable) {
        return product.variants[0].quantityAvailable;
    }
    else if (product.variant?.quantityAvailable) {
        return product.variant.quantityAvailable;
    }
    return 0;
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

export const checkProductCanAddToCart = (product: ISimpleProduct, items: IItems): { canAddToCart: boolean; isStockAvailable: boolean; productOnCart: ProductOnCart; stockAvailable: number; } => {
    const stockAvailable = getStockAvailable(product);
    const productOnCart = getProductOnCart(product, items);
    const isStockAvailable = stockAvailable > 0;
    const canAddToCart = ((productOnCart.quantityAvailable > productOnCart.quantity)) &&
        isStockAvailable;
    return { canAddToCart, isStockAvailable, productOnCart, stockAvailable };
}


export const checkPricingVariantIsOnSale = (variantPricing: IProductVariantPricing): boolean => {
    // también se puede usar la propiedad OnSale
    return !isEqual(variantPricing.priceUndiscounted, variantPricing.price);
}
export const checkProductIsOnSale = (product: ISimpleProduct): boolean => {
    if (product?.variants?.[0]?.pricing) {
        return checkPricingVariantIsOnSale(product.variants[0].pricing);
    } else if (product?.variant?.pricing) {
        return checkPricingVariantIsOnSale(product.variant.pricing);
    }
    return false;
}

// TODO: create component instead of function
export const getProductPricingClass = (canAddToCart: boolean, isOnSale: boolean): string => {
    const className: string = 'price';
    if (canAddToCart && !isOnSale) {
        return className;
    }
    return `${className} ${!canAddToCart ? "outStock_price" : isOnSale ? "discounted_price" : ""}`
}
