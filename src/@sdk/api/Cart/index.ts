import { ErrorListener } from "@sdk/helpers";
import { JobsManager } from "@sdk/jobs";
import { ErrorCartTypes } from "@sdk/jobs/Cart";
import { NetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel, ICheckoutModelLine, ICheckoutModelLineVariantLocalStorage } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { ISaleorStateSummeryPrices, StateItems } from "@sdk/state/types";

import {
  IDiscount,
  IItems,
  ISaleorCartAPI,
  IShippingPrice,
  ISubtotalPrice,
  ITotalPrice,
} from "./types";

export class SaleorCartAPI extends ErrorListener implements ISaleorCartAPI {
  loaded: boolean;
  items: IItems;
  totalPrice: ITotalPrice;
  subtotalPrice: ISubtotalPrice;
  shippingPrice: IShippingPrice;
  discount?: IDiscount;

  private checkoutLoaded: boolean;
  private summaryPricesLoaded: boolean;

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private saleorState: SaleorState;
  private networkManager: NetworkManager;
  private jobsManager: JobsManager;

  constructor(
    checkoutRepositoryManager: CheckoutRepositoryManager,
    networkManager: NetworkManager,
    saleorState: SaleorState,
    loadOnStart: boolean,
    jobsManager: JobsManager
  ) {
    super();
    this.saleorState = saleorState;
    this.checkoutRepositoryManager = checkoutRepositoryManager;
    this.networkManager = networkManager;
    this.jobsManager = jobsManager;

    this.loaded = false;
    this.checkoutLoaded = false;
    this.summaryPricesLoaded = false;

    this.jobsManager.attachErrorListener("cart", this.fireError);

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      ({ lines }: ICheckoutModel) => {
        this.items = lines
          ?.filter(line => line.quantity > 0)
          .sort((a, b) => {
            if (a.id && b.id) {
              const aId = a.id?.toUpperCase() || "";
              const bId = b.id?.toUpperCase() || "";
              return aId < bId ? -1 : aId > bId ? 1 : 0;
            } else {
              const aId = a.variant.id?.toUpperCase() || "";
              const bId = b.variant.id?.toUpperCase() || "";
              return aId < bId ? -1 : aId > bId ? 1 : 0;
            }
          });
        this.checkoutLoaded = true;
        this.loaded = this.checkoutLoaded && this.summaryPricesLoaded;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SUMMARY_PRICES,
      ({
        totalPrice,
        subtotalPrice,
        shippingPrice,
        discount,
      }: ISaleorStateSummeryPrices) => {
        this.totalPrice = totalPrice;
        this.subtotalPrice = subtotalPrice;
        this.shippingPrice = shippingPrice;
        this.discount = discount;
        this.summaryPricesLoaded = true;
        this.loaded = this.summaryPricesLoaded && this.checkoutLoaded;
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

  load = async () => {
    await this.saleorState.provideCheckout(this.fireError, true);
    return {
      pending: false,
    };
  };

  addItem = async (variant: ICheckoutModelLineVariantLocalStorage, quantity: number) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.addItemToCart(variant, quantity);

    // 2. save online if possible (if checkout id available)
    await this.refreshCheckout(this.saleorState.checkout);

    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  removeItem = async (variantId: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(variantId);
    // 2. save online if possible (if checkout id available)
    await this.refreshCheckout(this.saleorState.checkout);

    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  subtractItem = async (variantId: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.subtractItemFromCart(variantId);

    // 2. save online if possible (if checkout id available)
    await this.refreshCheckout(this.saleorState.checkout);

    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  updateItem = async (variantId: string, quantity: number) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.updateItemInCart(variantId, quantity);

    // 2. save online if possible (if checkout id available)
    await this.refreshCheckout(this.saleorState.checkout);

    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  refreshCheckout = async (checkout: ICheckoutModel | undefined) => {
    if (!checkout?.lines) {
      return;
    }
    

    for (const line of checkout.lines) {
      if (line.quantity > 0) {
         line.totalPrice = null;
      }
    }    
    const { data, error } = await this.networkManager.getRefreshedCheckoutLines(
      checkout.lines,
      this.checkoutRepositoryManager.getRepository().getDistrict()?.code || ''
    );

    if (error) {
      this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
    } else {
      this.checkoutRepositoryManager.getRepository().setCheckout({
        ...checkout,
        lines: data,
      });
    }
  };

  getCartLines = async () => {
    
    const { data, error } = await this.networkManager.getCartLines(
      this.saleorState.checkout?.lines || null,
      this.checkoutRepositoryManager.getRepository().getDistrict()?.code || ''
    );

    if (error) {
      this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
    }

    return {
      data,
      error,
    }
  }

  updateCartLines = (lines: ICheckoutModelLine[]) => {
    this.checkoutRepositoryManager.getRepository().setCheckout({
      ...this.saleorState.checkout,
      lines,
    });
  }
}
