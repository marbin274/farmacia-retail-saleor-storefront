import { createInstance, setLogger } from "@optimizely/react-sdk";
import { nanoid } from "nanoid";
import { optimizelySdkKey } from "@temp/core/constants";
import { LocalStorageItems } from "./@sdk/repository";

setLogger(null);

export const optimizelyClient = createInstance({
  sdkKey: optimizelySdkKey,
});

export const getOptimizelyUserId = () => {
  let userId = localStorage.getItem(LocalStorageItems.OPTIMIZELY_USER_ID_KEY);
  if (userId) {
    return userId;
  }

  userId = nanoid();
  localStorage.setItem(LocalStorageItems.OPTIMIZELY_USER_ID_KEY, userId);

  return userId;
};

