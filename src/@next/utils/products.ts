import { IItems } from "@sdk/api/Cart/types";
import { ATTRIBUTE_PROMOTION_LIMIT_MAX_NAME, MAX_ORDER_PER_PRODUCT } from "@temp/core/config";
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
const getStockLimitMax = (product: ISimpleProduct): { existLimitMax: boolean, stockLimitMax?: number } => {
    const isOnSale = checkProductIsOnSale(product);
    if (!isOnSale) { return { existLimitMax: false } };

    const limitMax = product.attributes?.find(it => it.attribute.name === ATTRIBUTE_PROMOTION_LIMIT_MAX_NAME);
    if (!limitMax) {
        return { existLimitMax: false };
    }
    else if (limitMax && limitMax.values?.[0]?.name) {
        const stockLimitMax: number = Number(limitMax.values[0].name);
        return { existLimitMax: true, stockLimitMax }
    }
    return { existLimitMax: false };
}

export const getStockAvailable = (product: ISimpleProduct): {stockAvailable:number, quantity:number} => {
    const { existLimitMax, stockLimitMax } = getStockLimitMax(product);
    let stockAvailable = 0;
    const  quantity = product.quantity ||0;
    if (product.variants?.[0].quantityAvailable) {
        stockAvailable = product.variants[0].quantityAvailable;
    }
    else if (product.variant?.quantityAvailable) {
        stockAvailable = product.variant.quantityAvailable;
    }
    if ((existLimitMax && stockLimitMax) && (stockLimitMax > 0 && stockLimitMax < stockAvailable)) {
        stockAvailable = stockLimitMax;
    }

    return { stockAvailable, quantity };
}

export const getProductOnCart = (product: ISimpleProduct, items: IItems): ProductOnCart => {
    const productOnCart = items && items.find(
        ({ variant }) => variant.product && (variant.product.id === product.id)
    );
    const { existLimitMax, stockLimitMax } = getStockLimitMax(product);
    if (!productOnCart) {
        return { quantity: 0, quantityAvailable: existLimitMax && stockLimitMax ? stockLimitMax : MAX_ORDER_PER_PRODUCT }
    }
    return {
        quantity: productOnCart.quantity,
        quantityAvailable: existLimitMax && stockLimitMax ? stockLimitMax : productOnCart.variant.quantityAvailable ? productOnCart.variant.quantityAvailable : 0,
    };
}

export const checkProductCanAddToCart = (product: ISimpleProduct, items: IItems): { canAddToCart: boolean; isStockAvailable: boolean; productOnCart: ProductOnCart; stockAvailable: number; } => {

    const {stockAvailable, quantity} = getStockAvailable(product);
    const productOnCart = getProductOnCart(product, items);
    const isStockAvailable = stockAvailable > 0;
    const canAddToCart = ((productOnCart.quantityAvailable > quantity)) &&
        isStockAvailable;
    return { canAddToCart, isStockAvailable, productOnCart, stockAvailable };
}

export const productStickerRules = (product: ISimpleProduct) => {
    const isOnSale = checkProductIsOnSale(product);
    const quantity = product.quantity || 0;
    let quantityAvailable = 0;
    if (product.variants?.[0].quantityAvailable) {
        quantityAvailable = product.variants[0].quantityAvailable;
    }
    else if (product.variant?.quantityAvailable) {
        quantityAvailable = product.variant.quantityAvailable;
    }
    const isOutStock = quantity >= quantityAvailable;
    return {isOnSale, isOutStock};
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


