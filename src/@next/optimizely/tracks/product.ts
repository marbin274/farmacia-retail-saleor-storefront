import { optimizelyClient } from "@temp/@sdk/optimizelyConfig";
import { EventKeys } from "../types";

export const trackAddProductToCartFromPersonalized = () => {
    if (!optimizelyClient.isReady) {
      return;
    }
    optimizelyClient.track(EventKeys.ADD_PRODUCT_TO_CART_FROM_PERSONALIZED);
  };

export const trackSelectProductFromPersonalized = () => {
    if (!optimizelyClient.isReady) {
      return;
    }
    optimizelyClient.track(EventKeys.SELECT_PRODUCT_FROM_PERSONALIZED);
  };
