import { optimizelyClient } from "@temp/@sdk/optimizelyConfig";
import { EventKeys } from "../types";

export const trackAddProductToCartFromPersonalized = () => {
  if (!optimizelyClient.isReady) {
    return;
  }
  optimizelyClient.track(EventKeys.ADD_PRODUCT_TO_CART_FROM_PERSONALIZED);
};
