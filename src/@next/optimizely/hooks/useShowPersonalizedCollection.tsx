import { useDecision } from "@optimizely/react-sdk";
import { FlagKeys, VariationKeys } from "../types";

export const useShowPersonalizedCollection = (): boolean => {
    const [decision, clientReady] = useDecision(FlagKeys.SHOW_PERSONALIZED_COLLECTION);
    
    if (!clientReady || !decision.enabled) {
        return false;
    }
    
    return decision.variationKey === VariationKeys.ON;
  };
  