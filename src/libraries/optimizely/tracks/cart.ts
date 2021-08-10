import { optimizelyClient } from "@temp/libraries/optimizely/optimizelyConfig";
import { EventKeys } from "../types";

export const trackAddToCartWithShowShippingPrice = () => {
  if (!optimizelyClient.isReady) {
    return;
  }
  optimizelyClient.track(EventKeys.GO_CHECKOUT_KNOWING_SHIPPING_PRICE);
};
