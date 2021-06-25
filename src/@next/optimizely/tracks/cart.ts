import { optimizelyClient } from "@temp/@sdk/optimizelyConfig";
import { EventKeys } from "../types";

export const trackAddToCart = () => {
    if (!optimizelyClient.isReady) {
      return;
    }
    optimizelyClient.track(EventKeys.ADD_TO_CART);
  };

  export const trackAddToCartWithShowShippingPrice = () => {
    if (!optimizelyClient.isReady) {
      return;
    }
    optimizelyClient.track(EventKeys.GO_CHECKOUT_KNOWING_SHIPPING_PRICE);
  };
