import { SaleorState } from "@sdk/state";
import { Checkout_lines_variant_pricing } from "../../fragments/gqlTypes/Checkout";
import { LocalRepository } from "../LocalRepository";
import {
  ICheckoutModel,
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage,
} from "../types";
import { ICheckoutRepositoryManager } from "./types";

export class CheckoutRepositoryManager implements ICheckoutRepositoryManager {
  private repository: LocalRepository;
  private saleorState: SaleorState;

  constructor(repository: LocalRepository, saleorState: SaleorState) {
    this.repository = repository;
    this.saleorState = saleorState;
  }

  getRepository = () => {
    return this.repository;
  };

  addItemToCart = (
    variantLS: ICheckoutModelLineVariantLocalStorage,
    quantity: number
  ) => {
    const lines = this.saleorState.checkout?.lines || [];
    let variant = lines.find(variant => variant.variant.id === variantLS.id);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantLS.id
    );
    const newVariantQuantity = variant ? variant.quantity + quantity : quantity;
    if (variant) {
      variant.quantity = newVariantQuantity;
      alteredLines.push(variant);
    } else {
      const product = variantLS?.product;
      variant = {
        id: variantLS?.id,
        name: product?.name || "",
        quantity,
        variant: {
          id: variantLS.id,
          pricing: product.pricing as Checkout_lines_variant_pricing,
          product: {
            __typename: "Product",
            attributes: [],
            id: product?.id || "",
            name: product?.name || "",
            category: variantLS?.product?.category,
            productType: {
              __typename: "ProductType",
              isShippingRequired: true,
            },
            thumbnail: null,
            thumbnail2x: null,
          },
          quantityAvailable: product.quantityAvailable,
        },
      };
      alteredLines.push(variant);
    }
    const alteredCheckout = this.getAlteredCheckout(alteredLines);
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  removeItemFromCart = (variantId: string) => {
    const lines = this.saleorState.checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    if (variant) {
      variant.quantity = 0;
      alteredLines.push(variant);
    }
    const alteredCheckout = this.getAlteredCheckout(alteredLines);
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  subtractItemFromCart = (variantId: string) => {
    const lines = this.saleorState.checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    const newVariantQuantity = variant ? variant.quantity - 1 : 0;
    if (variant) {
      variant.quantity = newVariantQuantity;
      alteredLines.push(variant);
    }
    const alteredCheckout = this.getAlteredCheckout(alteredLines);
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  updateItemInCart = (variantId: string, quantity: number) => {
    const lines = this.saleorState.checkout?.lines || [];
    const variant = lines.find(variant => variant.variant.id === variantId);
    const alteredLines = lines.filter(
      variant => variant.variant.id !== variantId
    );
    if (variant) {
      variant.quantity = quantity;
      alteredLines.push(variant);
    }
    const alteredCheckout: ICheckoutModel | null = this.getAlteredCheckout(
      alteredLines
    );
    this.repository.setCheckout(alteredCheckout);

    return alteredCheckout;
  };

  getAlteredCheckout = (
    alteredLines: ICheckoutModelLine[]
  ): ICheckoutModel | null => {
    const alteredCheckout: ICheckoutModel | null = this.saleorState.checkout
      ? {
          ...this.saleorState.checkout,
          availableShippingMethods: undefined,
          id: undefined,
          lines: alteredLines,
          shippingAddress: {
            ...this.saleorState.checkout.shippingAddress,
            city: undefined,
            id: undefined,
          },
          shippingMethod: null,
          token: undefined,
        }
      : {
          lines: alteredLines,
        };
    return alteredCheckout;
  };
}
