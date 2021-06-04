import { createInstance, useDecision, setLogger } from "@optimizely/react-sdk";
import { nanoid } from "nanoid";
import { optimizelySdkKey } from "@temp/constants";

const OPTIMIZELY_USER_ID_KEY = "@opt_id";

setLogger(null);

export const optimizelyClient = createInstance({
  sdkKey: optimizelySdkKey,
});

export const getOptimizelyUserId = () => {
  let userId = localStorage.getItem(OPTIMIZELY_USER_ID_KEY);
  if (userId) {
    return userId;
  }

  userId = nanoid();
  localStorage.setItem(OPTIMIZELY_USER_ID_KEY, userId);

  return userId;
};

export const useAddToCartButtonVariable = (): string => {
  const [decision, clientReady] = useDecision("add_to_cart_button");

  if (!clientReady) {
    return "";
  }

  if (!decision.enabled) {
    return "Agregar";
  }
  return decision.variables.text as string;
};

export const trackAddToCart = () => {
  if (!optimizelyClient.isReady) {
    return;
  }
  optimizelyClient.track("add-to-cart");
};
